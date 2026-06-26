// src/index.ts
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
var ALPHA_THRESHOLD = 0.002;
var MAX_ALPHA = 0.99;
var LOGO_VALUE = 255;
var DEFAULT_MIN_CORRELATION = 0.8;
var DEFAULT_SEARCH_MIN_MARGIN = 8;
var DEFAULT_SEARCH_MAX_MARGIN = 160;
var MIN_ALPHA_SCALE = 0.2;
var MAX_ALPHA_SCALE = 1.5;
var ASSETS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets");
var alphaMapCache = {};
function calculateAlphaMap(data, width, height) {
  const alphaMap = new Float32Array(width * height);
  for (let i = 0;i < alphaMap.length; i++) {
    const idx = i * 4;
    alphaMap[i] = Math.max(data[idx], data[idx + 1], data[idx + 2]) / 255;
  }
  return alphaMap;
}
function computeBrightness(data, width, height) {
  const bright = new Float64Array(width * height);
  for (let i = 0;i < bright.length; i++) {
    const j = i * 4;
    bright[i] = (data[j] + data[j + 1] + data[j + 2]) / 3;
  }
  return bright;
}
function correlationAt(bright, imageWidth, alphaMap, alphaSum, alphaSqSum, n, logoSize, x, y) {
  let sb = 0;
  let sbb = 0;
  let sab = 0;
  for (let row = 0;row < logoSize; row++) {
    const base = (y + row) * imageWidth + x;
    const arow = row * logoSize;
    for (let col = 0;col < logoSize; col++) {
      const bv = bright[base + col];
      sb += bv;
      sbb += bv * bv;
      sab += alphaMap[arow + col] * bv;
    }
  }
  const cov = sab / n - alphaSum / n * (sb / n);
  const varA = alphaSqSum / n - (alphaSum / n) ** 2;
  const varB = sbb / n - (sb / n) ** 2;
  const denom = Math.sqrt(varA * varB);
  return denom > 0.000000001 ? cov / denom : 0;
}
function detectWatermark(data, width, height, alphaMap, logoSize, searchMinMargin = DEFAULT_SEARCH_MIN_MARGIN, searchMaxMargin = DEFAULT_SEARCH_MAX_MARGIN) {
  const bright = computeBrightness(data, width, height);
  const n = logoSize * logoSize;
  let alphaSum = 0;
  let alphaSqSum = 0;
  for (let i = 0;i < n; i++) {
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
  for (let y = yMin;y <= yMax; y++) {
    for (let x = xMin;x <= xMax; x++) {
      const c = correlationAt(bright, width, alphaMap, alphaSum, alphaSqSum, n, logoSize, x, y);
      if (c > best) {
        best = c;
        bx = x;
        by = y;
      }
    }
  }
  return { x: bx, y: by, correlation: best };
}
function estimateAlphaScale(data, imageWidth, x, y, alphaMap, logoSize) {
  const bgArr = [[], [], []];
  for (let row = 0;row < logoSize; row++) {
    for (let col = 0;col < logoSize; col++) {
      if (alphaMap[row * logoSize + col] > 0.02)
        continue;
      const idx = ((y + row) * imageWidth + (x + col)) * 4;
      bgArr[0].push(data[idx]);
      bgArr[1].push(data[idx + 1]);
      bgArr[2].push(data[idx + 2]);
    }
  }
  const median = (a) => {
    if (a.length === 0)
      return 0;
    a.sort((p, q) => p - q);
    return a[a.length >> 1];
  };
  const bg = [median(bgArr[0]), median(bgArr[1]), median(bgArr[2])];
  let sxy = 0;
  let sxx = 0;
  for (let row = 0;row < logoSize; row++) {
    for (let col = 0;col < logoSize; col++) {
      const a = alphaMap[row * logoSize + col];
      if (a < 0.05)
        continue;
      const idx = ((y + row) * imageWidth + (x + col)) * 4;
      for (let c = 0;c < 3; c++) {
        const X = a * (LOGO_VALUE - bg[c]);
        const Y = data[idx + c] - bg[c];
        sxy += X * Y;
        sxx += X * X;
      }
    }
  }
  const scale = sxx > 0.000000001 ? sxy / sxx : 0;
  return Math.max(MIN_ALPHA_SCALE, Math.min(MAX_ALPHA_SCALE, scale));
}
function removeWatermarkPixels(data, imageWidth, alphaMap, position, alphaScale) {
  const { x, y, width, height } = position;
  for (let row = 0;row < height; row++) {
    for (let col = 0;col < width; col++) {
      const imgIdx = ((y + row) * imageWidth + (x + col)) * 4;
      const alphaIdx = row * width + col;
      let alpha = alphaMap[alphaIdx] * alphaScale;
      if (alpha < ALPHA_THRESHOLD)
        continue;
      alpha = Math.min(alpha, MAX_ALPHA);
      const oneMinusAlpha = 1 - alpha;
      for (let c = 0;c < 3; c++) {
        const watermarked = data[imgIdx + c];
        const original = (watermarked - alpha * LOGO_VALUE) / oneMinusAlpha;
        data[imgIdx + c] = Math.max(0, Math.min(255, Math.round(original)));
      }
    }
  }
}
function detectConfig(width, height) {
  return width > 1024 && height > 1024 ? { logoSize: 96, marginRight: 64, marginBottom: 64, alphaScale: 1 } : { logoSize: 48, marginRight: 96, marginBottom: 96, alphaScale: 0.6 };
}
function getAlphaMap(size) {
  const cached = alphaMapCache[size];
  if (cached)
    return cached;
  const pngPath = path.join(ASSETS_DIR, `bg_${size}.png`);
  const fileData = readFileSync(pngPath);
  const png = PNG.sync.read(fileData);
  const alphaMap = calculateAlphaMap(png.data, png.width, png.height);
  alphaMapCache[size] = alphaMap;
  return alphaMap;
}
async function removeGeminiWatermark(filePath, options = {}) {
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
    let x = width - config.marginRight - logoSize;
    let y = height - config.marginBottom - logoSize;
    let alphaScale = config.alphaScale;
    let method = "fallback";
    let correlation = 0;
    if (dynamic) {
      const det = detectWatermark(data, width, height, alphaMap, logoSize, searchMinMargin, searchMaxMargin);
      correlation = det.correlation;
      if (det.correlation >= minCorrelation) {
        x = det.x;
        y = det.y;
        alphaScale = estimateAlphaScale(data, width, x, y, alphaMap, logoSize);
        method = "detected";
      }
    }
    removeWatermarkPixels(data, width, alphaMap, { x, y, width: logoSize, height: logoSize }, alphaScale);
    ctx.putImageData(imageData, 0, 0);
    writeFileSync(filePath, canvas.toBuffer("image/png"));
    console.log(`[watermark] Removed Gemini watermark: ${filePath} (${width}x${height}, logo=${logoSize}px, pos=(${x},${y}), alphaScale=${alphaScale.toFixed(3)}, method=${method}, corr=${correlation.toFixed(3)})`);
    return true;
  } catch (error) {
    console.error("[watermark] Failed to remove Gemini watermark:", error);
    return false;
  }
}
var src_default = removeGeminiWatermark;
export {
  removeGeminiWatermark,
  estimateAlphaScale,
  detectWatermark,
  detectConfig,
  src_default as default,
  calculateAlphaMap
};
