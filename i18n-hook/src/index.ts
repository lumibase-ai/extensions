import { defineHook } from '@lumibase/extension-sdk';

/**
 * i18n Auto-Tag — a HOOK port of the "i18n Manager" marketplace demo.
 *
 * The original i18n Manager demo is a UI panel that lets editors manage
 * per-locale translations. This hook keeps the spirit of that demo but runs
 * server-side in the CMS worker: before an item is written, it inspects the
 * payload for human-readable string fields (the ones an editor would want to
 * translate) and records its findings.
 *
 * It is intentionally a safe no-op: it never throws, never blocks the write,
 * and only logs + annotates the payload with a `_i18n` metadata note.
 */

export const manifest = {
  id: 'lumibase/i18n-autotag',
  name: 'i18n Auto-Tag',
  version: '1.0.0',
  type: 'hook',
  icon: 'languages',
  description: 'Tags content with detected translatable fields on save (demo hook).',
  author: { name: 'LumiBase Team', email: 'hello@lumibase.dev' },
  requiredCapabilities: ['items:read'],
  compatibleWith: '^0.6.0',
} as const;

/** Field keys that are structural/metadata and never user-facing copy. */
const SKIP_KEYS = new Set([
  'id',
  'status',
  'slug',
  'site_id',
  'siteId',
  'created_at',
  'createdAt',
  'updated_at',
  'updatedAt',
  '_i18n',
]);

/** Minimum length before a string is considered worth translating. */
const MIN_TRANSLATABLE_LENGTH = 2;

/** A string looks translatable if it carries real prose rather than an enum/id token. */
function looksTranslatable(key: string, value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (SKIP_KEYS.has(key)) return false;
  const trimmed = value.trim();
  if (trimmed.length < MIN_TRANSLATABLE_LENGTH) return false;
  // Skip values that look like ids/slugs/tokens (no whitespace, all lowercase + separators).
  const looksLikeToken = /^[a-z0-9._-]+$/.test(trimmed);
  if (looksLikeToken && !/\s/.test(trimmed)) return false;
  return true;
}

function asLocale(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function asLocaleList(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value)) {
    const list = value.filter((v): v is string => typeof v === 'string' && v.length > 0);
    if (list.length > 0) return list;
  }
  return fallback;
}

export default defineHook<Record<string, unknown>>({
  on: 'items.update.before',
  handler: async ({ payload, ctx }) => {
    // Resolve config with sensible fallbacks; never trust shape.
    const defaultLocale = asLocale(ctx.config.defaultLocale, 'en');
    const locales = asLocaleList(ctx.config.locales, ['en', 'vi', 'ja']);

    if (payload == null || typeof payload !== 'object') {
      return;
    }

    const detected: string[] = [];
    for (const [key, value] of Object.entries(payload)) {
      if (looksTranslatable(key, value)) {
        detected.push(key);
      }
    }

    ctx.logger.info('i18n-autotag inspected item', {
      siteId: ctx.siteId,
      defaultLocale,
      locales,
      detected,
    });

    // Annotate the payload with a metadata note. This is a demo no-op:
    // it does not translate anything, only records what was detected.
    (payload as Record<string, unknown>)._i18n = {
      defaultLocale,
      locales,
      detected,
      taggedAt: new Date().toISOString(),
    };
  },
});
