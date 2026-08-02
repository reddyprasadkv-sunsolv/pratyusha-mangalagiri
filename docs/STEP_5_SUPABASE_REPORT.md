# Step 5 — Secure Supabase Backend Foundation

## Scope

- Repository: `reddyprasadkv-sunsolv/pratyusha-mangalagiri`
- Branch: `feature/angular-premium-sales-page`
- Baseline: `d78bf8ab5339a42652f708ed23cd0d30b8cb290c`
- Date: 2 August 2026

Step 5 adds version-controlled Supabase migrations, RLS/storage policy foundations, pgTAP tests, a disabled-by-default Angular client/auth/data layer, and local-content fallback. It does not create an administration UI, activate live CMS reads, submit leads, send email, add commerce/appointments/PDFs, create a project, apply a remote migration, or deploy Angular.

## Project and migration status

- Supabase CLI: unavailable in the execution environment.
- Container runtime/PostgreSQL client: unavailable.
- Approved project link: absent; no `supabase/.temp/project-ref` or documented project ID exists.
- Remote migration: **NOT APPLIED — APPROVED SUPABASE PROJECT LINK REQUIRED**.
- Local database reset/lint/pgTAP execution: not run because CLI and container runtime are unavailable.
- Repository migration contract validation: covered by Vitest static-security tests; full database execution remains required before remote application.

The checked-in structure follows the official local workflow: `config.toml`, ordered migrations, structural `seed.sql`, and `tests/database`.

## Database foundation

The schema creates 15 application tables, five enums, UUID keys, audit-friendly timestamps/actor fields, foreign keys, checks, unique constraints, and useful public/order/lead/audit indexes. Every application table has RLS enabled.

Role helper functions accept no target ID, use `auth.uid()`, have a fixed `search_path`, contain no dynamic SQL, and restrict execution to authenticated users. Content policies require `is_editor_or_owner()`; administrator profile and audit-log access requires `is_owner()`.

Publication triggers require an approved-to-published transition and reject unresolved markers, invisible/untimestamped content, blank product/FAQ fields, consentless testimonials, unapproved legal transitions, local/internal SEO canonicals, unapproved social media, or disallowed media.

## Storage

`public-media` and `private-source-assets` are private buckets with RLS-mediated reads. Only active administrators can upload/update/delete. JPEG, PNG, WebP, and AVIF are allowed; SVG, HTML, executable, PDF, and unknown types are excluded. Public objects additionally require matching published `media_assets` metadata.

## Seed review

The seed contains one unpublished structural setting and four known product keys as hidden drafts. No administrator, contact, PII, price, stock, testimonial, credential, ritual inclusion, legal content, future product, or published record is seeded.

## Angular foundation

`@supabase/supabase-js` 2.110.8 is pinned. One lazy root client is created only for valid enabled public configuration. Browser session persistence uses Supabase-supported auth handling; SSR disables persistence, refresh, and URL session detection. Custom token storage, TransferState session exposure, service-role configuration, and direct presentation-layer writes are absent.

The authentication service supplies sign-in, sign-out, session restoration, secure role loading, active-admin state, and sanitized errors, but no UI or route. The public page remains directly backed by the existing local service. `ContentRepository` resolves to the local implementation in Step 5; the Supabase repository foundation also returns local content and issues no CMS query.

## Tests and limitations

- pgTAP file: 28 security/behavior cases, prepared but not executed locally.
- Migration contract tests verify RLS declarations, fixed-path helpers, grant/policy boundaries, no anonymous writes, image-only storage, and Angular separation.
- Authoritative generated database types: pending a successful local stack; exact generation command is documented rather than fabricating types.
- Clean dependency installation: passed (510 packages installed).
- Formatting: passed.
- Type checking: passed.
- ESLint: passed.
- Vitest: 14 files and 54 tests passed.
- Playwright: 27 tests passed against the production SSR server with Supabase disabled.
- Production SSR build: passed with a 360.01 kB initial browser bundle (94.34 kB estimated transfer). The pre-existing 11.78 kB public-page SCSS budget warning remains below its configured error threshold.
- Dependency audit: no high or critical advisory; six moderate Angular CLI development-chain advisories remain. The suggested forced remediation would downgrade/change the Angular CLI incompatibly, so it was not applied.

## External requirements before Step 6 or remote use

- Approved Supabase organization/project and exact project reference
- Approved first-owner identity and secure Auth account creation
- Local/CI Supabase CLI plus container runtime
- Successful local migration reset, database lint, pgTAP execution, and generated-type review
- Secure deployment-time public URL/anonymous key injection
- Explicit approval before live CMS reads or administrator UI work
