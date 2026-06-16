# SEO Meta Editor

A LumiBase **interface** extension — a custom field editor for SEO metadata.

## What it does

Renders an editor for a value of shape `{ title?: string; description?: string }`:

- A **meta title** text input and a **meta description** textarea.
- Live **character counters** that turn red once they exceed the configured limits.
- A **Google search-result preview** card (SERP snippet) showing the blue title line,
  a green-ish URL line, and the gray description — truncated to the limits, so editors
  can see roughly how the listing will appear in search results.

## Type

`interface` — loaded by the host as an isolated ESM bundle and used to render/edit a
field value. Registered for the `json` and `string` field types.

## Configuration

| Option       | Type    | Default | Description               |
| ------------ | ------- | ------- | ------------------------- |
| `titleLimit` | integer | `60`    | Title character limit     |
| `descLimit`  | integer | `160`   | Description character limit |

These are read from `options` at runtime and drive both the counters and the preview
truncation.

## From the SEO Toolkit demo

This generalizes the "SEO Toolkit" marketplace demo into a reusable field **interface**.
Rather than a standalone toolkit panel, the SEO meta editing experience (title +
description + live snippet preview) is packaged as a field editor that can be attached to
any `json` or `string` field in the content model.

## Status

UI-focused. The component is fully wired to `value` / `onChange`, but persistence is
handled by the host — this extension does not perform any storage of its own.

## Constraints

Self-contained: inline styles only, no `@lumibase/ui` or other host packages imported.
`react`, `react-dom`, and `react/jsx-runtime` are externalized in the bundle.
