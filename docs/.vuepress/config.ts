import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress/cli';
import { viteBundler } from '@vuepress/bundler-vite';
const { description } = require('../../package');

export default defineUserConfig({
  lang: 'en-US',
  title: 'Adze - Isomorphic Logging for JavaScript',
  description,

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

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: [
      '/',
      { text: 'Getting Started', link: '/getting-started/introduction' },
      { text: 'Reference Manual', link: '/reference/introduction' },
    ],
    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          link: '/getting-started/introduction',
          collapsible: false,
          children: [
            { text: 'Introduction', link: '/getting-started/introduction' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Concepts', link: '/getting-started/concepts' },
            { text: 'Setup', link: '/getting-started/setup' },
            { text: 'Configuration', link: '/getting-started/configuration' },
            { text: 'Log Annotation', link: '/getting-started/annotation' },
            { text: 'Capturing Log Data', link: '/getting-started/capture-data' },
            { text: 'Log Threading', link: '/getting-started/threading' },
            { text: 'Filtering Logs', link: '/getting-started/filtering' },
            { text: 'Tools', link: '/getting-started/tools' },
            { text: 'Putting It All Together', link: '/getting-started/putting-it-all-together' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference Manual',
          link: '/reference/introduction',
          collapsible: false,
          children: [
            { text: 'Introduction & Lifecycle', link: '/reference/introduction' },
            { text: 'Log Class', link: '/reference/log-class' },
            { text: 'Modifiers', link: '/reference/modifiers' },
            // 'factories',
            // 'modifiers',
            // 'default-terminators',
            // 'other-terminators',
            // 'machine-readable-logs',
            // 'filtering-and-utility-functions',
            // 'getters-and-setters',
            // 'data',
            // 'globalstore-concepts',
            // 'using-globalstore',
            // 'unit-testing',
            // 'mapped-diagnostic-context',
            // 'micro-frontends',
          ],
        },
      ],
    },
  }),

  bundler: viteBundler(),
});
