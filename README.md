# thesma-docs

Developer documentation for the Thesma API, served at [docs.thesma.dev](https://docs.thesma.dev).

## Stack

- [Astro 5](https://astro.build) — static output
- [Starlight](https://starlight.astro.build) — docs framework
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-based config
- [Scalar](https://scalar.com) — API reference, live-fetched from `api.thesma.dev/openapi.json`

## Develop

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:4321`.

## Build

```bash
npm run build
```

Outputs static site to `dist/`.

## Deploy

Deployed to Railway via Docker. `main` auto-deploys to `docs.thesma.dev`.

## Contribute

Typos and fixes are welcome — every page has an "Edit this page on GitHub" link that opens the source MDX file on `main`. Open a PR.

## Related

- `thesma-marketing` — the marketing site at `thesma.dev`
- `govdata-api` — the API backend
