# Form Builder — LumiBase Module Extension

A self-contained Studio **module** extension that renders a full custom page: a
simple, drag-style form builder UI.

## What it is

- **Type:** `module` — a full custom page/section mounted inside LumiBase Studio.
- **Entry:** `src/index.tsx` (isolated ESM; `react`, `react-dom`, and
  `react/jsx-runtime` are externalized and provided by the host).
- **Self-contained:** does **not** import `@lumibase/ui` or any host package.
  All styling is inline (system-ui, soft borders, rounded corners) so the
  component is fully portable.

## UI

Three-column layout (inline flex):

1. **Left — Field palette:** buttons for Text, Email, Number, Textarea, Select,
   Checkbox, and Date. Clicking one appends a field to the form.
2. **Center — Canvas:** lists added fields. Each row shows the label, a type
   tag, a "required" toggle, move-up / move-down buttons, and a delete button.
   Selecting a row opens it in the inspector.
3. **Right — Inspector:** edits the selected field's `label` (text input) and
   `required` (checkbox).

A header shows the title "Form Builder", a disabled **Save form** button, and a
"(demo — not persisted)" note.

## Mapping from the Form Builder marketplace demo

This generalizes the "Form Builder" marketplace demo into a real Studio module.
The demo's field-palette → canvas → inspector interaction is preserved, but it
is now packaged as a full custom page (`type: "module"`) rather than a
marketplace card preview.

## Limitations (UI-only)

- All logic is **local React state** (`useState` / `useRef`). Nothing is
  persisted to the backend — there is no save/load, and the **Save form** button
  is intentionally disabled.
- No host capabilities are requested (`capabilities: []`).

## Scripts

```bash
pnpm dev      # vite dev server
pnpm build    # tsc typecheck + vite library build (ESM)
pnpm preview  # preview the built output
```
