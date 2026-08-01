# Pratyusha Mangalagiri — Angular application

Production-oriented Angular SSR website for Pratyusha Mangalagiri. Step 3 includes the complete bilingual English/Telugu public sales page, accessible route-aware language switching, local preference persistence, and a non-submitting reactive enquiry form.

## Runtime

- Node.js 24.18.1 LTS (pinned in `.nvmrc` and `.node-version`)
- npm 11
- Angular 22.1 with standalone APIs and Angular Router
- Angular SSR, prerendering, and client hydration with event replay
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

Playwright is configured for Chromium. Install its local browser binary before the first end-to-end run with `npx playwright install chromium`.

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

See `src/app/ARCHITECTURE.md` for ownership rules, `docs/DESIGN_SYSTEM.md` for tokens and components, `docs/react-reference-inventory.md` for the read-only reference inventory, and `docs/STEP_3_REPORT.md` for approved and pending content.

## Environment and secrets

`.env.example` documents future server-side configuration. Real `.env` files are ignored. Never commit private keys, service-role credentials, tokens, customer data, or production connection strings. Values shipped to browser bundles must be treated as public.

## Step 3 boundaries

- No React, Vite, Vinext, or Next.js runtime has been copied into this application.
- The public UI serves English at `/` and Telugu at `/te`.
- The reactive enquiry form validates locally and never submits, logs, or stores lead information.
- No document export or generation feature or dependency is included.
- Local approval artifacts under `output/` remain ignored and uncommitted.
