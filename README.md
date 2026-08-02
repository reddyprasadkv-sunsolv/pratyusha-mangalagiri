# Pratyusha Mangalagiri — Angular application

Production-oriented Angular SSR website for Pratyusha Mangalagiri. Step 4 adds request-time bilingual technical SEO to the complete English/Telugu crystal sales page, while preserving the approved four-product scope and non-submitting enquiry form.

## Runtime

- Node.js 24.18.1 LTS (pinned in `.nvmrc` and `.node-version`)
- npm 11
- Angular 22.1 with standalone APIs and Angular Router
- Request-time Angular SSR and client hydration with event replay
- Zoneless runtime (the scaffold was generated with `--zoneless`; `zone.js` is not installed)
- Strict TypeScript 6.0
- SCSS, Vitest, Playwright, ESLint, and Prettier

## Setup

```bash
nvm use
npm ci
npm start
```

The development server is available at `http://localhost:4200/`.

## Quality commands

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
npm run format:check
```

Playwright is configured for Chromium and starts the production SSR server. `npm run test:e2e` builds the application first. Install its local browser binary before the first end-to-end run with `npx playwright install chromium`.

## Architecture

The application uses feature boundaries under `src/app`:

```text
src/app/
  core/
  shared/
  layout/
  features/
    public-site/
    admin/
    content/
    media/
    leads/
    legal/
    settings/
```

See `src/app/ARCHITECTURE.md` for ownership rules, `docs/DESIGN_SYSTEM.md` for tokens and components, `docs/react-reference-inventory.md` for the read-only reference inventory, `docs/STEP_3_REPORT.md` for the original bilingual implementation, `docs/STEP_3C_REPORT.md` for product-asset validation, and `docs/STEP_4_SEO_REPORT.md` for SSR/SEO validation.

## Environment and secrets

`.env.example` documents public SSR configuration. Real `.env` files are ignored. Never commit private keys, service-role credentials, tokens, customer data, or production connection strings. Values shipped to browser bundles must be treated as public.

Set these deployment environment values:

- `PUBLIC_SITE_URL`: approved absolute public origin, used for canonical URLs, `hreflang`, Open Graph URLs, sitemap URLs, and JSON-LD.
- `PUBLIC_INDEXING_ENABLED`: set to `false` on preview/staging environments to return a global `X-Robots-Tag: noindex, nofollow` policy and disallow crawling in `robots.txt`.
- `NG_ALLOWED_HOSTS`: optional comma-separated additional hosts accepted by the Angular SSR engine. The `PUBLIC_SITE_URL` hostname is automatically allowed.

When `PUBLIC_SITE_URL` is omitted during a normal HTTP request, SSR derives the origin only from an allowed request host. No localhost or placeholder production URL is embedded in source metadata.

## Current boundaries

- No React, Vite, Vinext, or Next.js runtime has been copied into this application.
- The public UI serves English at `/` and Telugu at `/te`.
- The reactive enquiry form validates locally and never submits, logs, or stores lead information.
- Original promotional posters and future-product references remain outside Angular's public asset tree.
- No document export or generation feature or dependency is included.
- Local approval artifacts under `output/` remain ignored and uncommitted.
- Only `/` and `/te` are indexable. Draft legal routes return a bilingual, accessible, `noindex` HTTP 404 until their content is approved.
- Open Graph and Twitter image tags remain intentionally absent until an approved 1200×630 social-sharing image is supplied.
- No Supabase, administration backend, email, payment, appointment, or PDF integration is included.
