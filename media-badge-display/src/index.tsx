import Component from './component';

/**
 * NOTE: `@lumibase/extension-sdk` does not export a `defineDisplay` helper
 * (only `defineHook` and `defineInterface`). We therefore export a plain
 * object literal that the Studio display loader can consume directly.
 */

export const manifest = {
  id: 'lumibase/media-badge',
  name: 'Media Optimization Badge',
  version: '1.0.0',
  type: 'display',
  icon: 'image',
  description: 'Shows format, optimization status and size savings for a media field.',
  author: { name: 'LumiBase Team', email: 'hello@lumibase.dev' },
  requiredCapabilities: [],
  compatibleWith: '^0.6.0',
};

// Re-export the component so loaders that read `mod.component` can find it.
export { default as component } from './component';

export default {
  id: 'media-badge',
  name: 'Media Optimization Badge',
  component: Component,
  types: ['json', 'string'],
  options: [{ field: 'showSavings', name: 'Show size savings', type: 'boolean' }],
};
