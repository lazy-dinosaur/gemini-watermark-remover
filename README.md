# gemini-watermark-remover

Remove the SynthID watermark from Gemini AI-generated images.

## How it works

Gemini adds a semi-transparent white SynthID sparkle watermark to the
bottom-right corner of generated images. This package removes it using
**inverse alpha blending**:

```
Gemini compositing: watermarked = alpha x 255 + (1-alpha) x original
Inverse: original = (watermarked - alpha x 255) / (1 - alpha)
```

A pre-computed alpha map (`bg_48.png` / `bg_96.png`) encodes the sparkle shape.

### Dynamic detection (default)

Gemini periodically changes the watermark's position and opacity. To survive
those spec changes without code edits, removal is **self-locating** by default:

1. **Locate** — slide the sparkle template across the bottom-right corner and
   take the position of maximum Pearson correlation with image brightness.
2. **Estimate opacity** — least-squares fit the per-image alpha scale at that
   position (white watermark, `L=255`).
3. **Confidence gate** — if the best correlation is `>= minCorrelation` (0.8),
   use the detected position + scale (`method: "detected"`); otherwise fall back
   to the fixed `detectConfig` values (`method: "fallback"`).

Clean-background images self-heal when Gemini moves the watermark; busy images
fall back to the last-known-good fixed position. Only a change to the sparkle
*shape* requires regenerating the alpha map. Set `dynamic: false` to use the
fixed `detectConfig` values only.

## Install

```bash
npm install gemini-watermark-remover
# or
bun add gemini-watermark-remover
```

## Usage

```typescript
import { removeGeminiWatermark } from "gemini-watermark-remover";

const success = await removeGeminiWatermark("/path/to/image.png");
// Image is modified in-place. Pass options to tune detection:
// await removeGeminiWatermark(path, { dynamic: true, minCorrelation: 0.8 });
```

## API

### `removeGeminiWatermark(filePath, options?): Promise<boolean>`

Removes the SynthID watermark from a PNG image file (in-place).

- **filePath** - Absolute path to the PNG file
- **options.dynamic** - enable self-locating detection (default `true`)
- **options.minCorrelation** - detection acceptance threshold (default `0.8`)
- **options.searchMinMargin / searchMaxMargin** - bottom-right search bounds in
  px (default `8` / `160`)
- **Returns** - `true` if successful, `false` on error

### `detectWatermark(data, width, height, alphaMap, logoSize, minMargin?, maxMargin?)`

Cross-correlates the alpha template over the bottom-right corner; returns the
best `{ x, y, correlation }`.

### `estimateAlphaScale(data, width, x, y, alphaMap, logoSize)`

Least-squares estimate of the white-watermark opacity scale at a position.

### `detectConfig(width: number, height: number)`

Returns the **fallback** fixed `logoSize`, `marginRight`/`marginBottom`, and
`alphaScale` used when dynamic detection is disabled or below threshold.

### `calculateAlphaMap(data, width, height)`

Builds a normalized alpha map from RGBA pixel data for advanced workflows.

### Fallback fixed values

| Image size | Logo size | Margin | Alpha scale |
|-----------|-----------|--------|-------------|
| > 1024x1024 | 96px | 64px | 1.0 |
| <= 1024x1024 | 48px | 96px | 0.60 |

> The `<= 1024x1024` values were re-measured against Gemini 3.0 Flash output
> (2026-06) using removal-free raw captures on two backgrounds: the 48px white
> sparkle sits at a 96px bottom-right margin and composites at ~60% of the
> bundled alpha map's strength. The `> 1024x1024` path is legacy and currently
> unverified against the newer spec.

## Requirements

- Node.js 18+ or Bun
- `@napi-rs/canvas` (native dependency)

## Credits

Algorithm based on [journey-ad/gemini-watermark-remover](https://github.com/journey-ad/gemini-watermark-remover).

## License

MIT
