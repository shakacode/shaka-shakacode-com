import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {GlobExcludeDefault} from '@docusaurus/utils';
import {accessibleGithubLight, accessibleVsDark} from './src/prismThemes';
import {resolveDocsEditUrl} from '../../scripts/docs-edit-url.mjs';

const siteUrl = 'https://shaka.shakacode.com';
const siteDescription =
  'Give your coding agent a task. Get a tested, reviewed pull request that is easy to understand.';

// Prefer hosted DocSearch when CI provides the complete public search
// configuration. Local builds and fork previews keep the bundled local index.
const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
  indexName: process.env.ALGOLIA_INDEX_NAME,
};
const algoliaConfigValues = Object.values(algoliaConfig);
const useAlgolia = algoliaConfigValues.every(Boolean);

if (algoliaConfigValues.some(Boolean) && !useAlgolia) {
  throw new Error(
    'Algolia search configuration is incomplete. Set ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, and ALGOLIA_INDEX_NAME together.'
  );
}

const localSearchTheme: NonNullable<Config['themes']>[number] = [
  '@easyops-cn/docusaurus-search-local',
  {
    hashed: true,
    indexBlog: false,
    docsRouteBasePath: '/docs',
    highlightSearchTermsOnTargetPage: true,
    searchResultLimits: 8,
    searchBarShortcutHint: true,
  },
];

// Schema.org structured data so search engines understand the project, its
// publisher, and the site. Emitted once into <head> via headTags below.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.shakacode.com/#organization',
      name: 'ShakaCode',
      url: 'https://www.shakacode.com',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Shaka',
      description: siteDescription,
      publisher: {'@id': 'https://www.shakacode.com/#organization'},
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Shaka',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      description: siteDescription,
      url: siteUrl,
      softwareHelp: `${siteUrl}/docs`,
      codeRepository: 'https://github.com/shakacode/shaka',
      license: 'https://github.com/shakacode/shaka/blob/main/LICENSE',
      author: {'@id': 'https://www.shakacode.com/#organization'},
      offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
    },
  ],
};

const config: Config = {
  title: 'Shaka',
  tagline: 'Give your coding agent a task. Get a tested, reviewed PR.',
  favicon: 'img/brand/mark.svg',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl: '/',

  organizationName: 'shakacode',
  projectName: 'shaka-shakacode-com',

  onBrokenLinks: 'throw',
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(structuredData),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: useAlgolia ? [] : [localSearchTheme],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          exclude: [...GlobExcludeDefault, '**/planning/**'],
          editUrl: ({docPath}) => resolveDocsEditUrl(docPath),
        },
        blog: false,
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/brand/og-card.png',
    metadata: [
      {name: 'description', content: siteDescription},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'Shaka'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {
        property: 'og:image:alt',
        content: 'Shaka: give your coding agent a task, get a tested, reviewed pull request.',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Shaka',
      logo: {
        alt: 'Shaka logo',
        src: 'img/brand/mark.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/docs/getting-started', label: 'Get started', position: 'left'},
        {to: '/case-studies', label: 'Case studies', position: 'left'},
        {to: '/methodology', label: 'Methodology', position: 'left'},
        {
          href: 'https://www.shakacode.com/contact/',
          label: 'Get expert help',
          position: 'right',
          className: 'navbar-cta',
        },
        {
          href: 'https://github.com/shakacode/shaka',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting started', to: '/docs/getting-started'},
            {label: 'Working with Shaka', to: '/docs/working-with-shaka'},
            {label: 'PR verification', to: '/docs/pr-verification'},
            {label: 'Settings', to: '/docs/settings'},
            {
              label: 'Skill references',
              href: 'https://github.com/shakacode/shaka/tree/main/skills/shaka/references',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Repository', href: 'https://github.com/shakacode/shaka'},
            {label: 'Issues', href: 'https://github.com/shakacode/shaka/issues'},
            {label: 'Case studies', to: '/case-studies'},
            {label: 'Methodology', to: '/methodology'},
            {label: 'Principles', to: '/principles'},
            {label: 'Safety', to: '/safety'},
            {label: 'Glossary', to: '/glossary'},
          ],
        },
        {
          title: 'ShakaCode',
          items: [
            {label: 'shakacode.com', href: 'https://www.shakacode.com'},
            {
              label: 'Book a complimentary assessment',
              href: 'https://meetings.hubspot.com/justingordon/30-minute-consultation',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ShakaCode. Built with Docusaurus.`,
    },
    prism: {
      theme: accessibleGithubLight,
      darkTheme: accessibleVsDark,
      additionalLanguages: ['ruby', 'diff', 'bash', 'yaml', 'json'],
    },
    ...(useAlgolia && {
      algolia: {
        appId: algoliaConfig.appId!,
        apiKey: algoliaConfig.apiKey!,
        indexName: algoliaConfig.indexName!,
        contextualSearch: true,
      },
    }),
  } satisfies Preset.ThemeConfig,
};

export default config;
