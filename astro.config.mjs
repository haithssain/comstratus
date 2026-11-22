import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Remplacer par votre vrai domaine lors de la mise en ligne
export default defineConfig({
  site: 'https://www.comstratus.ca',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // La page d'accueil du site redirige vers la langue par défaut
  redirects: {
    '/': '/fr/',
  },
});
