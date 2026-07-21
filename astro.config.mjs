// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vipulkatarnaware.in',
  base: '/',

  // URL configuration
  trailingSlash: 'never', // Removes trailing slashes from URLs

  // Vite configuration
  vite: {
    plugins: [tailwindcss()],
  },

  // Required integrations
  integrations: [
    react(), // Enables React components
    sitemap({
      // Every app section sub-page (e.g. /careeros/decisions) canonicalizes to
      // its base app route (/careeros), so listing all ~14 sections per app in
      // the sitemap contradicts those canonical tags. Keep only the canonical
      // set: home, the five Finder tabs, and the five base app routes.
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '');
        const segments = path.split('/').filter(Boolean);
        // Depth 0 (home) and depth 1 (/about, /careeros, …) are canonical;
        // depth 2+ (/careeros/decisions) is a non-canonical section page.
        return segments.length <= 1;
      },
      serialize: (item) => {
        const url = item.url.endsWith('/') ? item.url.slice(0, -1) : item.url;
        return { ...item, url };
      },
    }),
  ],

  // Deployment configuration
  output: 'static', // Build as a pure static site
  devToolbar: {
    enabled: false,
  },
});
