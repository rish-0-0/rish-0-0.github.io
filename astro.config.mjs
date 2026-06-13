// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

const LOCALES = ['en', 'hi', 'es', 'fr', 'de', 'nl'];

export default defineConfig({
  site: 'https://rishabh-anand.com',
  outDir: './docs',

  integrations: [
    preact({ compat: false }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: Object.fromEntries(LOCALES.map((l) => [l, l])),
      },
      // The search index is a data endpoint, not a page.
      filter: (page) => !page.includes('search-index.json'),
    }),
  ],

  i18n: {
    locales: LOCALES,
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Self-host & optimise webfonts at build time — removes the render-blocking
  // round-trips to fonts.googleapis.com / fonts.gstatic.com.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: [300, 400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      weights: [300, 400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
