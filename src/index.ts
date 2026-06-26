import { createCanvas, loadImage } from "@napi-rs/canvas";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const ALPHA_THRESHOLD = 0.002;
const MAX_ALPHA = 0.99;
const LOGO_VALUE = 255; // SynthID 워터마크는 흰색(raw 이미지 2장 교차검증: L≈255)

// 동적 감지 기본값
const DEFAULT_MIN_CORRELATION = 0.8; // 이 값 미만이면 고정 위치로 폴백(false-accept 방지)
const DEFAULT_SEARCH_MIN_MARGIN = 8;
const DEFAULT_SEARCH_MAX_MARGIN = 160;
const MIN_ALPHA_SCALE = 0.2;
const MAX_ALPHA_SCALE = 1.5;

const ASSETS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "assets",
);

const alphaMapCache: Partial<Record<48 | 96, Float32Array>> = {};

export interface WatermarkOptions {
  /** false면 동적 감지를 끄고 detectConfig 고정값만 사용. 기본 true */
  dynamic?: boolean;
  /** 동적 감지 수용 임계값(Pearson 상관). 기본 0.8 */
  minCorrelation?: number;
  /** 우하단 코너에서 탐색 최소 마진(px). 기본 8 */
  searchMinMargin?: number;
  /** 우하단 코너에서 탐색 최대 마진(px). 기본 160 */
  searchMaxMargin?: number;
}

export interface WatermarkLocation {
  x: number;
  y: number;
  logoSize: 48 | 96;
  alphaScale: number;
  correlation: number;
  method: "detected" | "fallback";
}

export function calculateAlphaMap(
  data: Buffer | Uint8ClampedArray,
  width: number,
  height: number,
): Float32Array {
  const alphaMap = new Float32Array(width * height);

  for (let i = 0; i < alphaMap.length; i++) {
    const idx = i * 4;
    alphaMap[i] = Math.max(data[idx], data[idx + 1], data[idx + 2]) / 255.0;
  }

  return alphaMap;
}

function computeBrightness(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): Float64Array {
  const bright = new Float64Array(width * height);
  for (let i = 0; i < bright.length; i++) {
    const j = i * 4;
    bright[i] = (data[j] + data[j + 1] + data[j + 2]) / 3;
  }
  return bright;
}

/**
 * 알파맵 템플릿과 이미지 밝기 패치의 Pearson 상관을 한 위치에서 계산.
 * 템플릿 통계(alphaSum/alphaSqSum/n)는 호출자가 미리 계산해 재사용한다.
 */
function correlationAt(
  bright: Float64Array,
  imageWidth: number,
  alphaMap: Float32Array,
  alphaSum: number,
  alphaSqSum: number,
  n: number,
  logoSize: number,
  x: number,
  y: number,
): number {
  let sb = 0;
  let sbb = 0;
  let sab = 0;
  for (let row = 0; row < logoSize; row++) {
    const base = (y + row) * imageWidth + x;
    const arow = row * logoSize;
    for (let col = 0; col < logoSize; col++) {
      const bv = bright[base + col];
      sb += bv;
      sbb += bv * bv;
      sab += alphaMap[arow + col] * bv;
    }
  }
  const cov = sab / n - (alphaSum / n) * (sb / n);
  const varA = alphaSqSum / n - (alphaSum / n) ** 2;
  const varB = sbb / n - (sb / n) ** 2;
  const denom = Math.sqrt(varA * varB);
  return denom > 1e-9 ? cov / denom : 0;
}

/**
 * 우하단 코너 영역에서 워터마크 위치를 상호상관으로 탐색.
 * 반환: 최고 상관 위치(top-left)와 상관계수.
 */
export function detectWatermark(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  alphaMap: Float32Array,
  logoSize: number,
  searchMinMargin = DEFAULT_SEARCH_MIN_MARGIN,
  searchMaxMargin = DEFAULT_SEARCH_MAX_MARGIN,
): { x: number; y: number; correlation: number } {
  const bright = computeBrightness(data, width, height);

  const n = logoSize * logoSize;
  let alphaSum = 0;
  let alphaSqSum = 0;
  for (let i = 0; i < n; i++) {
    alphaSum += alphaMap[i];
    alphaSqSum += alphaMap[i] * alphaMap[i];
  }

  const xMax = width - logoSize - searchMinMargin;
  const xMin = Math.max(0, width - logoSize - searchMaxMargin);
  const yMax = height - logoSize - searchMinMargin;
  const yMin = Math.max(0, height - logoSize - searchMaxMargin);

  let best = -2;
  let bx = xMax;
  let by = yMax;
  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      const c = correlationAt(
        bright,
        width,
        alphaMap,
        alphaSum,
        alphaSqSum,
        n,
        logoSize,
        x,
        y,
      );
      if (c > best) {
        best = c;
        bx = x;
        by = y;
      }
    }
  }
  return { x: bx, y: by, correlation: best };
}

/**
 * 흰색 워터마크 가정에서 위치 (x,y)의 실제 불투명도 스케일을 최소제곱으로 추정.
 * 합성식: watermarked = a*255 + (1-a)*orig,  a = scale * templateAlpha
 * => (w - bg) = scale * templateAlpha * (255 - bg)  (orig≈로컬 배경)
 * 채널 3개에 걸친 회귀로 scale을 구하고 [0.2,1.5]로 클램프한다.
 */
export function estimateAlphaScale(
  data: Uint8ClampedArray,
  imageWidth: number,
  x: number,
  y: number,
  alphaMap: Float32Array,
  logoSize: number,
): number {
  const bgArr: number[][] = [[], [], []];
  for (let row = 0; row < logoSize; row++) {
    for (let col = 0; col < logoSize; col++) {
      if (alphaMap[row * logoSize + col] > 0.02) continue;
      const idx = ((y + row) * imageWidth + (x + col)) * 4;
      bgArr[0].push(data[idx]);
      bgArr[1].push(data[idx + 1]);
      bgArr[2].push(data[idx + 2]);
    }
  }
  const median = (a: number[]): number => {
    if (a.length === 0) return 0;
    a.sort((p, q) => p - q);
    return a[a.length >> 1];
  };
  const bg = [median(bgArr[0]), median(bgArr[1]), median(bgArr[2])];

  let sxy = 0;
  let sxx = 0;
  for (let row = 0; row < logoSize; row++) {
    for (let col = 0; col < logoSize; col++) {
      const a = alphaMap[row * logoSize + col];
      if (a < 0.05) continue;
      const idx = ((y + row) * imageWidth + (x + col)) * 4;
      for (let c = 0; c < 3; c++) {
        const X = a * (LOGO_VALUE - bg[c]);
        const Y = data[idx + c] - bg[c];
        sxy += X * Y;
        sxx += X * X;
      }
    }
  }
  const scale = sxx > 1e-9 ? sxy / sxx : 0;
  return Math.max(MIN_ALPHA_SCALE, Math.min(MAX_ALPHA_SCALE, scale));
}

function removeWatermarkPixels(
  data: Uint8ClampedArray,
  imageWidth: number,
  alphaMap: Float32Array,
  position: { x: number; y: number; width: number; height: number },
  alphaScale: number,
): void {
  const { x, y, width, height } = position;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const imgIdx = ((y + row) * imageWidth + (x + col)) * 4;
      const alphaIdx = row * width + col;

      let alpha = alphaMap[alphaIdx] * alphaScale;
      if (alpha < ALPHA_THRESHOLD) continue;

      alpha = Math.min(alpha, MAX_ALPHA);
      const oneMinusAlpha = 1.0 - alpha;

      for (let c = 0; c < 3; c++) {
        const watermarked = data[imgIdx + c];
        const original = (watermarked - alpha * LOGO_VALUE) / oneMinusAlpha;
        data[imgIdx + c] = Math.max(0, Math.min(255, Math.round(original)));
      }
    }
  }
}

export function detectConfig(
  width: number,
  height: number,
): {
  logoSize: 48 | 96;
  marginRight: number;
  marginBottom: number;
  alphaScale: number;
} {
  // 동적 감지가 실패(저신뢰)했을 때의 폴백 고정값.
  // Gemini 3.0 Flash (측정 2026-06): 1024x1024 출력. 워터마크 = 48px 흰색 스파클이
  // 우하단에서 96px 마진 위치에 찍히며, 불투명도는 기존 템플릿의 약 60% 수준.
  // (제거 없는 raw 이미지 2장 교차검증: 나무/파랑 배경 모두 위치 (880,880),
  //  색상 흰색 L=255, alphaScale 0.60에서 잔차 ~0.5.)
  // >1024 경로는 레거시(현재 미사용)이며 검증 데이터가 없어 기존 값을 유지한다.
  return width > 1024 && height > 1024
    ? { logoSize: 96, marginRight: 64, marginBottom: 64, alphaScale: 1.0 }
    : { logoSize: 48, marginRight: 96, marginBottom: 96, alphaScale: 0.6 };
}

function getAlphaMap(size: 48 | 96): Float32Array {
  const cached = alphaMapCache[size];
  if (cached) return cached;

  const pngPath = path.join(ASSETS_DIR, `bg_${size}.png`);
  const fileData = readFileSync(pngPath);
  const png = PNG.sync.read(fileData);
  const alphaMap = calculateAlphaMap(png.data, png.width, png.height);

  alphaMapCache[size] = alphaMap;
  return alphaMap;
}

/**
 * PNG 이미지에서 Gemini SynthID 워터마크를 제거(in-place).
 *
 * 기본은 동적 감지: 우하단 코너에서 스파클 템플릿과의 상호상관으로 위치를 찾고,
 * 그 위치의 불투명도를 최소제곱으로 추정한다. 상관계수가 minCorrelation 미만이면
 * detectConfig의 고정값으로 폴백한다. dynamic:false로 끄면 고정값만 사용.
 */
export async function removeGeminiWatermark(
  filePath: string,
  options: WatermarkOptions = {},
): Promise<boolean> {
  try {
    const dynamic = options.dynamic ?? true;
    const minCorrelation = options.minCorrelation ?? DEFAULT_MIN_CORRELATION;
    const searchMinMargin = options.searchMinMargin ?? DEFAULT_SEARCH_MIN_MARGIN;
    const searchMaxMargin = options.searchMaxMargin ?? DEFAULT_SEARCH_MAX_MARGIN;

    const img = await loadImage(filePath);
    const { width, height } = img;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const config = detectConfig(width, height);
    const logoSize = config.logoSize;
    const alphaMap = getAlphaMap(logoSize);

    // 폴백 고정 위치/스케일
    let x = width - config.marginRight - logoSize;
    let y = height - config.marginBottom - logoSize;
    let alphaScale = config.alphaScale;
    let method: "detected" | "fallback" = "fallback";
    let correlation = 0;

    if (dynamic) {
      const det = detectWatermark(
        data,
        width,
        height,
        alphaMap,
        logoSize,
        searchMinMargin,
        searchMaxMargin,
      );
      correlation = det.correlation;
      if (det.correlation >= minCorrelation) {
        x = det.x;
        y = det.y;
        alphaScale = estimateAlphaScale(data, width, x, y, alphaMap, logoSize);
        method = "detected";
      }
    }

    removeWatermarkPixels(
      data,
      width,
      alphaMap,
      { x, y, width: logoSize, height: logoSize },
      alphaScale,
    );
    ctx.putImageData(imageData, 0, 0);

    writeFileSync(filePath, canvas.toBuffer("image/png"));

    console.log(
      `[watermark] Removed Gemini watermark: ${filePath} (${width}x${height}, logo=${logoSize}px, pos=(${x},${y}), alphaScale=${alphaScale.toFixed(3)}, method=${method}, corr=${correlation.toFixed(3)})`,
    );
    return true;
  } catch (error) {
    console.error("[watermark] Failed to remove Gemini watermark:", error);
    return false;
  }
}

export default removeGeminiWatermark;
