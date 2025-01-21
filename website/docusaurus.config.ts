/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import users from './showcase.json';
import versions from './versions.json';

const lastVersion = versions[0];
const copyright = `Copyright © ${new Date().getFullYear()} Agora Protocol`;

const commonDocsOptions = {
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  editUrl:
    'https://github.com/agora-protocol/agora-protocol.github.io/blob/main/website/',
  remarkPlugins: [require('@react-native-website/remark-snackplayer')],
};

const isDeployPreview = process.env.PREVIEW_DEPLOY === 'true';

const config: Config = {
  future: {
    // Make Docusaurus build faster - enabled by default
    // See https://github.com/facebook/docusaurus/issues/10556
    // See https://github.com/agora-protocol/agora-protocol.github.io/pull/4268
    // See https://docusaurus.io/blog/releases/3.6
    experimental_faster: (process.env.DOCUSAURUS_FASTER ?? 'true') === 'true',
  },

  title: 'Agora Protocol',
  tagline: 'A scalable protocol for decentralized agentic networks',
  organizationName: 'agora-protocol',
  projectName: 'agora-protocol.github.io',
  url: 'https://agoraprotocol.org',
  baseUrl: '/',
  clientModules: [
    require.resolve('./modules/snackPlayerInitializer.js'),
    require.resolve('./modules/jumpToFragment.js'),
  ],
  trailingSlash: false, // because trailing slashes can break some existing relative links
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
      defer: true,
    },
    {
      src: 'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8ryO5qrZo8Exadq9qmt1wtm4_2FdZGEAKHDFEt_2BBlwwM4.js',
      defer: true,
    },
    {src: 'https://snack.expo.dev/embed.js', defer: true},
    {src: 'https://platform.twitter.com/widgets.js', async: true},
  ],
  favicon: 'img/favicon2.ico',
  titleDelimiter: '·',
  customFields: {
    users,
    facebookAppId: '1677033832619985',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'throw',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars'),
          editCurrentVersion: true,
          onlyIncludeVersions: isDeployPreview
            ? ['current', ...versions.slice(0, 2)]
            : undefined,
          versions: {
            [lastVersion]: {
              badge: false, // Do not show version badge for last RN version
            },
          },
          ...commonDocsOptions,
        },
        blog: {
          path: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          feedOptions: {
            type: 'all',
            copyright,
          },
          onInlineAuthors: 'ignore',
          // Ignore for now due to old posts
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
          ],
        },
        // TODO: GA is deprecated, remove once we're sure data is streaming in GA4 via gtag.
        googleAnalytics: {
          trackingID: 'UA-41298772-2',
        },
        gtag: {
          trackingID: 'G-58L13S6BDP',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    //[
    //  'content-docs',
    //  /** @type {import('@docusaurus/plugin-content-docs').Options} */
    //  {
    //    id: 'architecture',
    //    path: 'architecture',
    //    routeBasePath: '/architecture',
    //    sidebarPath: require.resolve('./sidebarsArchitecture'),
    //    ...commonDocsOptions,
    //  },
    //],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: '/contributing',
        sidebarPath: require.resolve('./sidebarsContributing'),
        ...commonDocsOptions,
      },
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: 'community',
        path: 'community',
        routeBasePath: '/community',
        sidebarPath: require.resolve('./sidebarsCommunity'),
        ...commonDocsOptions,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#20232a',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#20232a',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/pwa/manifest-icon-512.png',
            color: '#06bcee',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#20232a',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    announcementBar: {
      id: 'under-construction',
      content: 'Website under construction -- expect breaking changes!',
      backgroundColor: '#20232a',
      textColor: '#fff',
      isCloseable: true,
    },
    prism: {
      defaultLanguage: 'jsx',
      theme: require('./core/PrismTheme'),
      additionalLanguages: [
        'diff',
        'bash',
        'json',
        'java',
        'kotlin',
        'objectivec',
        'swift',
        'groovy',
        'ruby',
        'flow',
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-add-line',
          line: 'highlight-add-next-line',
          block: {start: 'highlight-add-start', end: 'highlight-add-end'},
        },
        {
          className: 'code-remove-line',
          line: 'highlight-remove-next-line',
          block: {
            start: 'highlight-remove-start',
            end: 'highlight-remove-end',
          },
        },
      ],
    },
    navbar: {
      title: 'Agora Protocol',
      /*logo: {
        src: 'img/header_logo.svg',
        alt: 'Agora Protocol',
      },*/
      style: 'dark',
      items: [
        {
          label: 'Docs',
          type: 'dropdown',
          position: 'right',
          items: [
            {
              label: 'Guides',
              type: 'doc',
              docId: 'getting-started',
            },
            {
              label: 'Protocol',
              type: 'doc',
              docId: 'protocol/beginner-friendly',
            },
          ],
        },
        /*{
          type: 'doc',
          docId: 'overview',
          label: 'Contributing',
          position: 'right',
          docsPluginId: 'contributing',
        },*/
        /*{
          type: 'doc',
          docId: 'overview',
          label: 'Community',
          position: 'right',
          docsPluginId: 'community',
        },*/
        /*{
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },*/
        {
          href: 'https://github.com/agora-protocol/python',
          'aria-label': 'Discord server',
          position: 'right',
          className: 'navbar-discord-link',
        },
        {
          href: 'https://github.com/agora-protocol/python',
          'aria-label': 'GitHub repository',
          position: 'right',
          className: 'navbar-github-link',
        },
      ],
    },
    image: 'img/logo-share.png',
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Develop',
          items: [
            {
              label: 'Guides',
              to: 'docs/getting-started',
            },
            /*{
              label: 'Components',
              to: 'docs/components-and-apis',
            },
            {
              label: 'APIs',
              to: 'docs/accessibilityinfo',
            },*/
          ],
        },
        /*{
          title: 'Participate',
          items: [
            {
              label: 'Showcase',
              to: 'showcase',
            },
            {
              label: 'Contributing',
              to: 'contributing/overview',
            },
            {
              label: 'Community',
              to: 'community/overview',
            },
            //{
            //  label: 'Stack Overflow',
            //  href: 'https://stackoverflow.com/questions/tagged/react-native',
            //},
          ],
        },*/
        {
          title: 'Find us',
          items: [
            //{
            //  label: 'Blog',
            //  to: 'blog',
            //},
            {
              label: 'X',
              href: 'https://x.com/Agora_Protocol',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/agora-protocol/python',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/MXmfhwQ4FB',
            },
          ],
        },
        //{
        //  title: 'Explore More',
        //  items: [
        //    {
        //      label: 'ReactJS',
        //      href: 'https://react.dev/',
        //    },
        //    {
        //      label: 'Privacy Policy',
        //      href: 'https://opensource.fb.com/legal/privacy/',
        //    },
        //    {
        //      label: 'Terms of Service',
        //      href: 'https://opensource.fb.com/legal/terms/',
        //    },
        //  ],
        //},
      ],
      copyright,
    },
    algolia: {
      appId: '8TDSE0OHGQ',
      apiKey: '83cd239c72f9f8b0ed270a04b1185288',
      indexName: 'react-native-v2',
      contextualSearch: true,
    },
    metadata: [
      {
        property: 'og:image',
        content: 'https://reactnative.dev/img/logo-share.png',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
      {
        name: 'twitter:image',
        content: 'https://reactnative.dev/img/logo-share.png',
      },
      {name: 'twitter:site', content: '@reactnative'},
    ],
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
