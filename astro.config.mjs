// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://docs.thesma.dev',
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: 'Thesma docs',
      description: 'Developer documentation for the Thesma API — SEC EDGAR, US Census, US BLS, US SBA.',
      logo: {
        src: './public/favicon.svg',
        replacesTitle: false,
      },
      editLink: {
        baseUrl: 'https://github.com/thenerdcastle/thesma-docs/edit/main/',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/thenerdcastle/thesma-docs' },
      ],
      customCss: ['./src/styles/theme.css'],
      components: {
        SocialIcons: './src/components/auth-nav-cluster.astro',
        SiteTitle: './src/components/site-title.astro',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Datasets',
          autogenerate: { directory: 'datasets' },
        },
        {
          label: 'Recipes',
          autogenerate: { directory: 'recipes' },
        },
        {
          label: 'Clients',
          autogenerate: { directory: 'clients' },
        },
        {
          label: 'API Reference',
          link: '/api-reference',
        },
      ],
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
