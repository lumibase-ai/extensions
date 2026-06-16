import Component from './component';

export const manifest = {
  id: 'lumibase/analytics-panel',
  name: 'Analytics Overview',
  version: '1.0.0',
  type: 'panel',
  icon: 'bar-chart-3',
  description: 'Dashboard panel showing pageviews, visitors and a 7-day trend (demo data).',
  author: { name: 'LumiBase Team', email: 'hello@lumibase.dev' },
  requiredCapabilities: [] as string[],
  compatibleWith: '^0.6.0',
};

export default {
  id: 'analytics-panel',
  name: 'Analytics Overview',
  component: Component,
  options: [
    { field: 'title', name: 'Panel title', type: 'string' },
    { field: 'provider', name: 'Provider label', type: 'string' },
  ],
};

export { default as component } from './component';
