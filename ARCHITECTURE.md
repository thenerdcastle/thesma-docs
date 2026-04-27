# Architecture

## Overview

Thesma Docs is a static documentation site built with [Astro 6](https://astro.build) and [Starlight 0.38+](https://starlight.astro.build). It compiles to plain HTML/CSS/JS at build time and is served by nginx in a Docker container deployed to Railway.

Note: thesma-marketing is on Astro 5. The docs repo bumped to Astro 6 because the latest Starlight requires it — authoring experience (MDX + Tailwind v4 tokens) stays identical.

## Page / Layout / Component structure

Starlight owns the layout, masthead, sidebar, breadcrumbs, search, and the "Edit this page on GitHub" link on every interior page. Custom content is MDX in `src/content/docs/`.

```
src/content/docs/            # Starlight content collection — file-based routing
  ├── index.mdx              # Home
  ├── getting-started/       # Quickstart, Authentication, Rate limits, Errors, Pagination
  ├── datasets/              # SEC EDGAR, US Census, US BLS, US SBA
  │   └── sec-edgar/
  │       └── xbrl-mapping.mdx
  ├── recipes/               # Worked examples, one per dataset + cross-dataset flagship
  ├── clients/               # Python SDK, CLI, MCP server
  └── api-reference.mdx      # Scalar-embedded, live OpenAPI

src/components/              # Custom Starlight overrides
  ├── scalar-reference.astro        # Scalar web component wrapper
  ├── api-reference-notice.astro    # "Try it" key-in-browser warning banner
  ├── auth-nav-cluster.astro        # Sign in link + Get API Key CTA in masthead (SocialIcons slot)
  └── site-title.astro              # Wordmark override → links to thesma.dev marketing

src/styles/theme.css         # Tailwind v4 @theme tokens + Starlight CSS-var overrides
```

## Content collections

Content lives under `src/content/docs/` using Starlight's `docsLoader()` and `docsSchema()` (declared in `src/content.config.ts`). Every file is `.mdx` so components can render inline.

## Sidebar

Declared in `astro.config.mjs` under the Starlight integration's `sidebar` config. Top-level groups use `autogenerate: { directory: '<slug>' }` so new MDX files appear automatically — no per-page sidebar edits.

Sidebar order matches the IA spec: Getting Started → Datasets → Recipes → Clients → API Reference. The masthead wordmark links to the thesma.dev marketing site (per D-03); the docs home (`/`) is reached via the Getting Started sidebar group's first entry.

## Styling

Tailwind CSS v4 with CSS-based configuration in `src/styles/theme.css`. Theme tokens (colors, fonts) are defined using the `@theme` directive and mapped to Starlight's `--sl-color-*` CSS variables so Starlight chrome inherits thesma.dev's palette. No `tailwind.config.*` JS file — all configuration is CSS-native.

## Scalar API reference

`src/components/scalar-reference.astro` mounts Scalar via the imperative `Scalar.createApiReference('#app', { url: 'https://api.thesma.dev/openapi.json' })` pattern, loaded from jsdelivr's CDN. The OpenAPI spec is fetched in the user's browser at page load — no build-time caching. If jsdelivr is unreachable, the `#app` element shows a fallback message with a link to `api.thesma.dev/docs` directly.

The API Reference page uses Starlight's `template: splash` so Scalar gets the full viewport width, not the narrow content column. Sidebar collapses on that route.

## Search

Starlight's default search is [Pagefind](https://pagefind.app) — a static search index built at build time and run client-side. Scalar has its own search on the API Reference page (standard dual-search pattern; matches Stripe/Resend/Vercel docs).

## Docker deployment

```
Dockerfile (multi-stage)
  Stage 1: node:20-alpine → npm ci → npm run build → dist/
  Stage 2: nginx:alpine → copy dist/ → serve on port 8080
```

`nginx.conf` mirrors `thesma-marketing/nginx.conf`:
- Trailing-slash redirects (301 `/foo/` → `/foo`)
- Clean URL resolution (`try_files $uri $uri.html =404`)
- Static asset caching (1 year for CSS/JS/images)
- Gzip compression
- Custom 404 page

## External dependencies (runtime)

The site has two runtime-fetched dependencies on the API Reference page only:

1. `cdn.jsdelivr.net/npm/@scalar/api-reference` — Scalar's JS bundle (CDN).
2. `api.thesma.dev/openapi.json` — the live OpenAPI spec.

Every other page is fully static with zero runtime dependencies.
