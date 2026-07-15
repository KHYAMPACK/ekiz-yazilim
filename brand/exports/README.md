# Brand exports

Logo geometry matches `components/logoPaths.ts` (viewBox `0 0 100 100`).

## SVG (source of truth)

| File | Use |
|------|-----|
| `ekiz-mark.svg` | White mark (brackets + core) — dark backgrounds |
| `ekiz-mark-black.svg` | Black mark — light backgrounds |
| `ekiz-logo-horizontal-white.svg` | Mark + stacked ekiz / YAZILIM — dark bg |
| `ekiz-logo-horizontal-black.svg` | Same in black — light bg |
| `ekiz-powered-by.svg` | Footer badge: Powered by + black tile with white E (core only) + wordmark (preferred) |
| `ekiz-powered-by-full-mark.svg` | Same, but black tile with full white mark (brackets + core) |

Backgrounds are transparent. Powered-by badges are for dark footers (white / muted #9a9590 text).

## PNG

Generated under `png/` via:

```
node scripts/export-brand-pngs.mjs
```

Uses `@resvg/resvg-js` with `fonts/SpaceGrotesk.ttf`.

| Asset | Sizes |
|-------|--------|
| Mark white/black | 512x512, 128x128 |
| Horizontal logos | 1200x400 |
| Powered-by (preferred) | 800x107, 1600x213 |
| Powered-by (full mark) | 800x96, 1600x192 |

## Client embed

```html
<a href="https://ekizyazilim.com" rel="noopener noreferrer">
  <img src="ekiz-powered-by.svg" alt="Powered by ekiz YAZILIM" height="24" />
</a>
```