import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Explicit order: start with getting started, then everyday use, then setup
// and reference. Control towers are optional, so they sit under Advanced.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'README',
    'getting-started',
    'working-with-shaka',
    'pr-verification',
    {
      type: 'category',
      label: 'Set up a repository',
      collapsed: false,
      items: ['configure-repository', 'settings', 'coding-agents', 'migration'],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['workflow', 'repository-catalog', 'writing-preferences'],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: ['control-towers'],
    },
    {
      type: 'link',
      label: 'Skill references (GitHub)',
      href: 'https://github.com/shakacode/shaka/tree/main/skills/shaka/references',
    },
  ],
};

export default sidebars;
