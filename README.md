# Pratyusha Mangalagiri — Angular application

Production-oriented Angular SSR foundation and bilingual premium design system for the Pratyusha Mangalagiri website. Step 2 includes the shared public layout, reusable UI components, and local design preview without backend integration.

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

See `src/app/ARCHITECTURE.md` for ownership rules, `docs/DESIGN_SYSTEM.md` for tokens and components, and `docs/react-reference-inventory.md` for the read-only inventory of the approved reference branch.

## Environment and secrets

`.env.example` documents future server-side configuration. Real `.env` files are ignored. Never commit private keys, service-role credentials, tokens, customer data, or production connection strings. Values shipped to browser bundles must be treated as public.

## Step 2 boundaries

- No React, Vite, Vinext, or Next.js runtime has been copied into this application.
- The public UI is a bilingual design-system preview, not a backend-connected production page.
- Form controls never submit or store lead information.
- No document export or generation feature or dependency is included.
- Local approval artifacts under `output/` remain ignored and uncommitted.
