import Component from './component';
import { defineInterface } from '@lumibase/extension-sdk';

export const manifest = {
  id: 'lumibase/seo-meta',
  name: 'SEO Meta Editor',
  version: '1.0.0',
  type: 'interface',
  icon: 'search',
  description: 'Edit SEO meta title & description with a live Google snippet preview.',
  author: { name: 'LumiBase Team', email: 'hello@lumibase.dev' },
  requiredCapabilities: [],
  compatibleWith: '^0.6.0',
};

export default defineInterface({
  id: 'seo-meta',
  name: 'SEO Meta Editor',
  component: Component as any,
  types: ['json', 'string'],
  group: 'presentation',
  options: [
    { field: 'titleLimit', name: 'Title char limit', type: 'integer' },
    { field: 'descLimit', name: 'Description char limit', type: 'integer' },
  ],
});
