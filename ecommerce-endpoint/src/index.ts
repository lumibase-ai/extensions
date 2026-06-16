import type { Hono } from 'hono';

/**
 * E-Commerce Connect — ENDPOINT extension.
 *
 * Runs server-side in the CMS worker (Hono). At runtime LumiBase mounts the
 * exported `handler(app)` under `/extensions/ecommerce/*`. This is NOT a
 * React/UI extension.
 *
 * Responses follow the LumiBase shape: `{ data: T }` / `{ errors: [...] }`.
 */
export const manifest = {
  id: 'lumibase/ecommerce',
  name: 'E-Commerce Connect',
  version: '1.0.0',
  type: 'endpoint',
  icon: 'shopping-cart',
  description: 'Mock product & inventory API mounted at /extensions/ecommerce.',
  author: { name: 'LumiBase Team', email: 'hello@lumibase.dev' },
  requiredCapabilities: ['http:fetch'],
  compatibleWith: '^0.6.0',
} as const;

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  stock: number;
}

const PROVIDER = 'shopify';

const PRODUCTS: Product[] = [
  { id: 'prod_001', title: 'Aurora Wireless Headphones', price: 129.99, currency: 'USD', stock: 42 },
  { id: 'prod_002', title: 'Lumen Smart Desk Lamp', price: 59.0, currency: 'USD', stock: 0 },
  { id: 'prod_003', title: 'Nimbus Travel Backpack', price: 89.5, currency: 'USD', stock: 17 },
  { id: 'prod_004', title: 'Pulse Fitness Tracker', price: 149.0, currency: 'USD', stock: 8 },
  { id: 'prod_005', title: 'Echo Mechanical Keyboard', price: 109.95, currency: 'USD', stock: 23 },
];

/**
 * Registers endpoint routes on the Hono app passed in by the runtime loader.
 * Routes are relative; the host mounts them under `/extensions/ecommerce`.
 */
export function handler(app: Hono): void {
  app.get('/', (c) =>
    c.json({ data: { ok: true, provider: PROVIDER, products: PRODUCTS.length } }),
  );

  app.get('/products', (c) => c.json({ data: PRODUCTS }));

  app.get('/products/:id', (c) => {
    const id = c.req.param('id');
    const product = PRODUCTS.find((p) => p.id === id);
    return product
      ? c.json({ data: product })
      : c.json({ errors: [{ message: 'Product not found' }] }, 404);
  });
}

export default { handler };
