# E-Commerce Connect (endpoint extension)

A LumiBase **endpoint** extension. It runs server-side in the CMS worker (Hono)
— it is **not** a React/UI extension. At runtime LumiBase mounts the exported
`handler(app)` under `/extensions/ecommerce/*`.

## What it is

This generalizes the "E-Commerce Connect" marketplace demo into a real endpoint
that exposes a mock product & inventory JSON API. Where the marketplace demo
showed a connector card in Studio, this endpoint serves the data the connector
would have fetched — backed by in-memory mock products. No external store is
called; **all data is mock**.

## Type

`endpoint` — registers routes on the Hono app passed to `handler(app)`. The host
mounts them under `/extensions/ecommerce`.

## Routes

All routes are relative to the mount point `/extensions/ecommerce`.

| Method | Path            | Response                                                              |
| ------ | --------------- | -------------------------------------------------------------------- |
| GET    | `/`             | `{ data: { ok: true, provider, products: <count> } }`               |
| GET    | `/products`     | `{ data: [ { id, title, price, currency, stock } ] }`               |
| GET    | `/products/:id` | `{ data: <product> }`, or `404 { errors: [{ message }] }` if missing |

Responses follow the LumiBase response shape: `{ data: ... }` on success and
`{ errors: [...] }` on failure.

## Mapping from the demo

| Marketplace demo concept     | Endpoint equivalent                          |
| ---------------------------- | -------------------------------------------- |
| "E-Commerce Connect" listing | `displayName` in `lumibase-extension.json`   |
| Provider select (Shopify…)   | `config` key `provider` (default `shopify`)  |
| Connector → fetches catalog  | `GET /products` returning mock catalog       |
| Inventory sync               | `stock` field on each mock product           |
| Product detail view          | `GET /products/:id`                          |

## Capabilities

Declares `http:fetch`, reflecting that a real provider integration would make
outbound calls. The mock implementation does not currently use it.

## Build

```bash
pnpm build   # tsc + vite build (ESM bundle, hono externalized)
```
