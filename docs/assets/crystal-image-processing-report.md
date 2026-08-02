# Crystal Image Processing Report

The four approved public images were cropped from the supplied posters without generative replacement. The crop removes headings, benefit lists, claim text, icons, brand text, and poster borders while retaining the photographed bracelet, bead order, colours, charm, metal details, and original photographic background.

Pillow 12.2.0 was used as a local development tool. Public files were converted to lossy WebP with metadata removed. The source posters remain outside Angular's public asset tree.

| Product                      | Source poster   | Crop box `(left, top, right, bottom)` | Master output                                  | Responsive output                                  | Visual validation                                                      |
| ---------------------------- | --------------- | ------------------------------------- | ---------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| Success Bracelet             | 1254 × 1254 PNG | `(8, 260, 708, 960)`                  | `success-bracelet.webp`, 700 × 700             | `success-bracelet-640.webp`, 640 × 640             | Pass — complete bracelet, no embedded text, icons, or claims           |
| Evil Eye Protection Bracelet | 1254 × 1254 PNG | `(90, 420, 750, 1080)`                | `evil-eye-protection-bracelet.webp`, 660 × 660 | `evil-eye-protection-bracelet-640.webp`, 640 × 640 | Pass — complete bracelet, no embedded text, icons, or claims           |
| Money Magnet Bracelet        | 1254 × 1254 PNG | `(10, 285, 660, 935)`                 | `money-magnet-bracelet.webp`, 650 × 650        | `money-magnet-bracelet-640.webp`, 640 × 640        | Pass — complete bracelet and charm, no embedded text, icons, or claims |
| Pyrite Bracelet              | 1254 × 1254 PNG | `(75, 350, 745, 1020)`                | `pyrite-bracelet.webp`, 670 × 670              | `pyrite-bracelet-640.webp`, 640 × 640              | Pass — complete bracelet, no embedded text, icons, or claims           |

## Output sizes

| File                                    |  Bytes |
| --------------------------------------- | -----: |
| `success-bracelet.webp`                 | 83,220 |
| `success-bracelet-640.webp`             | 66,046 |
| `evil-eye-protection-bracelet.webp`     | 53,356 |
| `evil-eye-protection-bracelet-640.webp` | 46,050 |
| `money-magnet-bracelet.webp`            | 70,980 |
| `money-magnet-bracelet-640.webp`        | 60,902 |
| `pyrite-bracelet.webp`                  | 57,048 |
| `pyrite-bracelet-640.webp`              | 48,882 |

## Review notes

- All outputs use a consistent 1:1 product-card aspect ratio.
- No source was upscaled for its master output; the 640 px variants use Lanczos downsampling only.
- Colour replacement, generative fill, synthetic sharpening, and bracelet reconstruction were not used.
- The original studio backgrounds remain because they frame the products naturally and do not contain public claims after cropping.
- Visual review confirmed that no product is confused with Pyrite Clusters or any future product.

## Client portrait

The approved 1086 × 1448 pink-saree PNG was preserved in `design-assets/source/client/` and converted to a 1086 × 1448 WebP (208,400 bytes) with metadata removed. No crop, facial alteration, generative fill, or saree modification was applied. The legacy duplicate files under `public/images/` were removed after preservation.
