// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  outDir: './docs',

  integrations: [preact({ compat: false })],

  i18n: {
    locales: ['en', 'hi', 'es', 'fr', 'de', 'nl'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});