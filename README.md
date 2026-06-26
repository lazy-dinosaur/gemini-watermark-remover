# gemini-watermark-remover

Remove the SynthID watermark from Gemini AI-generated images.

## How it works

Gemini adds a semi-transparent white SynthID logo watermark to the bottom-right corner of generated images. This package removes it using **inverse alpha blending**:

```
Gemini compositing: watermarked = alpha x 255 + (1-alpha) x original
Inverse: original = (watermarked - alpha x 255) / (1 - alpha)
```

Pre-computed alpha maps (`bg_48.png`, `bg_96.png`) are used to precisely locate and remove the watermark.

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
// Image is modified in-place
```

## API

### `removeGeminiWatermark(filePath: string): Promise<boolean>`

Removes the SynthID watermark from a PNG image file.

- **filePath** - Absolute path to the PNG file
- **Returns** - `true` if successful, `false` on error
- **Side effect** - Overwrites the original file

### `detectConfig(width: number, height: number)`

Returns the watermark `logoSize`, bottom-right `marginRight`/`marginBottom`, and
`alphaScale` (watermark opacity relative to the bundled alpha map) for the given
image dimensions.

### `calculateAlphaMap(data, width, height)`

Builds a normalized alpha map from RGBA pixel data for advanced workflows.

### Image size detection

| Image size | Logo size | Margin | Alpha scale |
|-----------|-----------|--------|-------------|
| > 1024x1024 | 96px | 64px | 1.0 |
| <= 1024x1024 | 48px | 96px | 0.60 |

> The `<= 1024x1024` values were re-measured against Gemini 3.0 Flash output
> (2026-06) using removal-free raw captures on two different backgrounds: the
> 48px white sparkle sits at a 96px bottom-right margin and composites at ~60%
> of the bundled alpha map's strength. The `> 1024x1024` path is legacy and
> currently unverified against the newer spec.

## Requirements

- Node.js 18+ or Bun
- `@napi-rs/canvas` (native dependency)

## Credits

Algorithm based on [journey-ad/gemini-watermark-remover](https://github.com/journey-ad/gemini-watermark-remover).

## License

MIT
