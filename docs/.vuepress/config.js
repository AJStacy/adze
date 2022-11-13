const { description } = require('../../package');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Adze JS - Better JavaScript Logging',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    // Facebook Link Meta
    [
      'meta',
      {
        property: 'og:title',
        content: 'Adze - Better JavaScript Logging',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A TypeScript enabled library with a beautiful API that simplifies JavaScript logging.',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://adzejs.com/assets/img/demo.ce24f23e.png',
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: 'https://www.adzejs.com/',
      },
    ],
    // Twitter Link Meta
    [
      'meta',
      {
        property: 'twitter:title',
        content: 'Adze - Better JavaScript Logging',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content:
          'A TypeScript enabled library with a beautiful API that simplifies JavaScript logging.',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: 'https://adzejs.com/assets/img/demo.ce24f23e.png',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    // --- Others
    [
      'script',
      {
        async: true,
        defer: true,
        'data-domain': 'adzejs.com',
        src: 'https://plausible.io/js/plausible.js',
      },
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/npm/adze/dist/adze.min.js',
      },
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Share&display=swap',
        rel: 'stylesheet',
      },
    ],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '64x64',
        href: '/favicon.png',
      },
    ],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/icon.svg',
    repo: 'https://github.com/AJStacy/Adze',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebarDepth: 1,
    nav: [
      {
        text: 'Tutorial',
        link: '/quick-start/',
      },
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/',
      },
      {
        text: "FAQ's",
        link: '/faqs/',
      },
      {
        text: "Add-on's",
        link: '/addons/creating-addons',
      },
    ],
    sidebar: {
      '/quick-start/': [
        {
          title: 'Quick Start',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'modifying-logs',
            'logger-configuration',
            'environment-controls',
            'global-context',
            'log-listeners',
          ],
        },
      ],
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'installation',
            'adze-concepts',
            'factories',
            'modifiers',
            'default-terminators',
            'other-terminators',
            'machine-readable-logs',
            'filtering-and-utility-functions',
            'getters-and-setters',
            'data',
            'shed-concepts',
            'using-shed',
            'unit-testing',
            'mapped-diagnostic-context',
            'micro-frontends',
          ],
        },
      ],
      '/addons/': [
        {
          title: "Add-on's",
          collapsable: false,
          children: ['creating-addons', 'official-addons'],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};
