# CLAUDE.md

## Project

Developer documentation for the Thesma API, served at [docs.thesma.dev](https://docs.thesma.dev). Standalone docs site — quickstart, authentication, rate limits, dataset guides, recipes, client libraries, and a live-embedded Scalar API reference.

## Stack

- **Astro 6** — static output, no JS runtime by default (thesma-marketing is on Astro 5; thesma-docs bumped to Astro 6 because Starlight 0.38 requires it)
- **Starlight** — docs framework (sidebar, search, breadcrumbs, edit-this-page)
- **Tailwind CSS v4** — CSS-based config via `@tailwindcss/vite` (no `tailwind.config.*`)
- **Scalar** — API reference, live-fetched from `api.thesma.dev/openapi.json` at browser runtime (no build-time caching)
- **TypeScript** — strict mode
- **Deployment** — Railway via Docker (nginx serves static files on port 8080)

## Key directories

| Directory | Purpose |
|---|---|
| `src/content/docs/` | Starlight content collection (MDX) |
| `src/components/` | Custom components (Scalar wrapper, CTA button, Head override) |
| `src/styles/` | Tailwind theme + Starlight CSS-variable overrides |
| `public/` | Static assets (robots.txt, favicon, og image) |

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build    # outputs to dist/
```

## Conventions

- kebab-case file and folder names
- All content in MDX (`.mdx`), not `.md` — enables inline components
- No client-side JS by default — Astro + Starlight components only
- Dark background, light text, developer-focused aesthetic (matches thesma.dev)
- Theme tokens in `src/styles/theme.css` using Tailwind v4 `@theme` directive, mapped to Starlight's `--sl-color-*` CSS vars

## Design

- Dark navy/charcoal backgrounds (mirrors thesma.dev's palette)
- Light text (`text-primary`, `text-secondary`, `text-muted`)
- Accent blue for CTAs and interactive elements
- Inter for body text, JetBrains Mono for code

## External URLs

- **API**: https://api.thesma.dev
- **OpenAPI spec**: https://api.thesma.dev/openapi.json (live-fetched by Scalar)
- **Portal**: https://portal.thesma.dev (signup at `/signup`, dashboard at `/dashboard`)
- **Marketing**: https://thesma.dev
- **Screener**: https://screener.thesma.dev

## Related repos

- Marketing: `/Users/willcodejavaforfood/Documents/GitHub/thesma-marketing`
- API: `/Users/willcodejavaforfood/Documents/GitHub/govdata-api`
- Portal: `/Users/willcodejavaforfood/Documents/GitHub/govdata-portal`
- Spec: `/Users/willcodejavaforfood/Documents/gov-data-docs`
