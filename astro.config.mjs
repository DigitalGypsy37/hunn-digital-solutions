// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. When moving to the real domain, set
  // site to the domain and remove `base`.
  site: "https://DigitalGypsy37.github.io",
  base: "/hunn-digital-solutions",

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});