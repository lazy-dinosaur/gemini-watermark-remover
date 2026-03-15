import { createCanvas, loadImage } from "@napi-rs/canvas";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const ALPHA_THRESHOLD = 0.002;
const MAX_ALPHA = 0.99;
const LOGO_VALUE = 255;

const ASSETS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "assets",
);

const alphaMapCache: Partial<Record<48 | 96, Float32Array>> = {};

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

function removeWatermarkPixels(
  data: Uint8ClampedArray,
  imageWidth: number,
  alphaMap: Float32Array,
  position: { x: number; y: number; width: number; height: number },
): void {
  const { x, y, width, height } = position;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const imgIdx = ((y + row) * imageWidth + (x + col)) * 4;
      const alphaIdx = row * width + col;

      let alpha = alphaMap[alphaIdx];
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
): { logoSize: 48 | 96; marginRight: 32 | 64; marginBottom: 32 | 64 } {
  return width > 1024 && height > 1024
    ? { logoSize: 96, marginRight: 64, marginBottom: 64 }
    : { logoSize: 48, marginRight: 32, marginBottom: 32 };
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

export async function removeGeminiWatermark(filePath: string): Promise<boolean> {
  try {
    const img = await loadImage(filePath);
    const { width, height } = img;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, width, height);
    const config = detectConfig(width, height);
    const position = {
      x: width - config.marginRight - config.logoSize,
      y: height - config.marginBottom - config.logoSize,
      width: config.logoSize,
      height: config.logoSize,
    };

    const alphaMap = getAlphaMap(config.logoSize);
    removeWatermarkPixels(imageData.data, width, alphaMap, position);
    ctx.putImageData(imageData, 0, 0);

    const buffer = canvas.toBuffer("image/png");
    writeFileSync(filePath, buffer);

    console.log(
      `[watermark] Removed Gemini watermark: ${filePath} (${width}x${height}, logo=${config.logoSize}px)`,
    );
    return true;
  } catch (error) {
    console.error("[watermark] Failed to remove Gemini watermark:", error);
    return false;
  }
}

export default removeGeminiWatermark;
