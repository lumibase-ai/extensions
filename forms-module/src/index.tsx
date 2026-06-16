import Component from './component';

export const manifest = {
  id: 'lumibase/forms-builder',
  name: 'Form Builder',
  version: '1.0.0',
  type: 'module',
  icon: 'list-checks',
  description: 'A drag-style form builder page (UI demo; not yet persisted).',
  author: { name: 'LumiBase Team', email: 'hello@lumibase.dev' },
  requiredCapabilities: [],
  compatibleWith: '^0.6.0',
};

export default {
  id: 'forms-builder',
  name: 'Form Builder',
  component: Component,
  options: [],
};

export { default as component } from './component';
