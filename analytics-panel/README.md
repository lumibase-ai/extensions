# Analytics Overview — LumiBase Panel Extension

A self-contained **dashboard panel** for the LumiBase Studio. It renders a card you
place on the Studio dashboard showing traffic statistics and a 7-day trend.

> **Note:** This panel uses **demo data only**. It does not connect to any real
> analytics provider — the numbers and chart are hard-coded mock values for
> demonstration and UI purposes.

## Type

- **Extension type:** `panel`
- **Entry:** `./src/index.tsx`
- **Compatible with:** LumiBase `^0.6.0`

## What it shows

- A header with the configurable panel title and a provider chip.
- Three stat tiles: **Pageviews** (24,830), **Unique Visitors** (8,412),
  **Avg. Time** (2m 14s).
- A **7-day bar chart** (Mon–Sun) drawn with pure CSS `div`s — no chart library.
- A green trend indicator: `▲ 12.4% vs last week`.

## Configuration

| Key        | Type   | Default              | Description          |
| ---------- | ------ | -------------------- | -------------------- |
| `title`    | string | `Analytics Overview` | Panel header title   |
| `provider` | string | `Plausible`          | Provider chip label  |

Options are passed to the component via `props.options`.

## Relation to the Analytics Hub demo

This panel generalizes the **"Analytics Hub"** marketplace demo into a reusable
Studio dashboard panel:

| Analytics Hub demo            | This panel                                      |
| ----------------------------- | ----------------------------------------------- |
| Full marketplace landing page | A single dashboard **card** you can place       |
| Marketing/showcase framing    | Operational "at a glance" traffic overview      |
| Static hero visuals           | Stat tiles + pure-SVG/CSS 7-day bar chart       |
| Fixed copy                    | Configurable `title` + `provider` chip          |

## Design constraints

This extension is loaded as **isolated ESM**. It:

- Does **not** import `@lumibase/ui` or any host package.
- Uses **inline styles only** (no external CSS, no chart library).
- Ships React as an external (provided by the host runtime).

## Develop

```bash
pnpm install
pnpm dev      # vite dev server
pnpm build    # tsc + vite library build (ESM)
```
