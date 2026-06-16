# i18n Auto-Tag

A LumiBase **hook** extension that detects translatable fields on an item and
records them as a metadata note when the item is saved.

## Type: hook

This is a server-side **hook**, not a UI/React extension. It runs inside the
CMS worker and is registered with the `@lumibase/extension-sdk` `defineHook`
helper. It subscribes to the `items.update.before` lifecycle event, so it
executes *before* an item write is committed.

The handler receives `{ payload, item, ctx }`:

- `payload` — the incoming item data being written.
- `item` — the existing item (when available).
- `ctx` — `{ siteId, config, logger, fetch, errors }`.

## Relationship to the "i18n Manager" demo

The marketplace "i18n Manager" demo is a UI panel that lets editors manage
per-locale translations interactively. This extension generalizes the same
idea into a hook:

| i18n Manager (demo UI panel) | i18n Auto-Tag (this hook) |
| --- | --- |
| Runs in the Studio UI (React) | Runs server-side in the CMS worker |
| Editor picks/edits translations | Inspects payload automatically on save |
| Surfaces locale columns | Detects which string fields look translatable |
| Writes translation values | Annotates a `_i18n` metadata note only |

## Behavior

On `items.update.before` the hook:

1. Reads `defaultLocale` (fallback `"en"`) and `locales`
   (fallback `["en", "vi", "ja"]`) from `ctx.config`.
2. Scans the payload's string fields, skipping structural/id-like keys and
   short token values, to find ones that look like human-readable copy.
3. Logs the detected fields via `ctx.logger.info`.
4. Annotates the payload with a `_i18n` note:

   ```jsonc
   {
     "defaultLocale": "en",
     "locales": ["en", "vi", "ja"],
     "detected": ["title", "body"],
     "taggedAt": "2026-06-16T00:00:00.000Z"
   }
   ```

## Safe demo no-op

This extension is intentionally minimal and non-destructive:

- It **does not** translate any content.
- It **does not** throw — guards handle non-object payloads and malformed config.
- It **does not** block or alter the write beyond adding the `_i18n` annotation.

Its only effects are logging and annotating the payload, which makes it a safe
reference example for authoring hooks against the real SDK types.

## Configuration

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultLocale` | `string` | `"en"` | Locale treated as the source of truth. |
| `locales` | `json` | `["en", "vi", "ja"]` | Enabled translation locales. |

## Capabilities

- `items:read`
