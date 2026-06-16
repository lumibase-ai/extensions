# Media Optimization Badge

A LumiBase **display** extension — a compact, read-only field renderer shown in list and detail views for an image/media field. It surfaces optimization status at a glance using small color-coded pill badges.

## What it shows

Given a media field value, it renders up to three pills:

- **Format pill** — e.g. `WEBP`, `AVIF`, `JPEG`, `PNG`. Modern formats (`webp`/`avif`) are green; legacy formats (`jpeg`/`png` and others) are amber.
- **Status pill** — a green check `Optimized` pill or a gray `Not optimized` pill.
- **Savings pill** — when the `showSavings` option is enabled and both `originalKb` and `optimizedKb` are present, a blue `-X%` pill showing how much smaller the optimized asset is.

If the value is empty/unrecognized, it renders a neutral `No media` pill.

### Expected value shape

```ts
{
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  optimized?: boolean;
  originalKb?: number;
  optimizedKb?: number;
}
```

The value may be `null` or partial — every field is handled gracefully and missing data simply omits the corresponding pill.

## Type

| Property        | Value                                  |
| --------------- | -------------------------------------- |
| Extension type  | `display` (read-only field renderer)   |
| Field types     | `json`, `string`                       |
| Compatible with | `^0.6.0`                               |

## Config options

| Key           | Type      | Default | Description        |
| ------------- | --------- | ------- | ------------------ |
| `showSavings` | `boolean` | `true`  | Show size savings  |

## Mapping from the "Media Optimizer" demo

This generalizes the **Media Optimizer** marketplace demo into a reusable field **display** component:

- The demo's full optimization workflow → distilled into a **read-only status renderer** suitable for list/detail columns.
- The demo's format/optimization results → mapped onto compact **pill badges** (format, optimized state, savings).
- Where the demo performed and persisted optimization, this component only **renders** the optimization metadata already attached to the field value.

## Implementation notes (UI-focused)

- **Self-contained ESM.** Loaded as an isolated module by the Studio. It does **not** import `@lumibase/ui` or any host package.
- **Inline styles only.** No external CSS, no design-system imports — all styling is inline with rounded pills and a `system-ui` font stack, kept compact for table cells.
- `@lumibase/extension-sdk` does not export a `defineDisplay` helper (only `defineHook` and `defineInterface`), so `src/index.tsx` exports a plain object literal as its default plus a named `component` re-export so the Studio loader (`mod.default ?? mod.component`) can resolve the renderer either way.
- Feature logic is presentational only; nothing is persisted.
