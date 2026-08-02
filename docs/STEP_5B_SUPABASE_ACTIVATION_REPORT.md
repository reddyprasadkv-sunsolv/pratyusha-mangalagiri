# Step 5B — Supabase Activation Report

Date: 2 August 2026

Repository: `reddyprasadkv-sunsolv/pratyusha-mangalagiri`

Branch: `feature/angular-premium-sales-page`

Verified baseline: `d3550d3`

## Outcome

The approved `Pratyusha Crystal` Supabase project is active in `ap-south-1` (South Asia, Mumbai). Five versioned migrations are applied, local and remote migration histories match, the live schema passes database lint, and all 30 pgTAP security and integrity assertions pass. TypeScript types were generated from the migrated remote schema and the Angular administrator login was verified locally in both configured and explicitly disabled modes.

Step 6B remains **NOT READY** because no exact `FIRST_OWNER_EMAIL` was supplied. No owner was invented, invited, or inserted, so real owner login, session restoration, dashboard access, and sign-out cannot yet be validated.

## Approved project and external actions

- Organisation: `SUNSOLV TECHNOLOGIES`
- Project: `Pratyusha Crystal`
- Region: `ap-south-1` / South Asia (Mumbai)
- Project reference in this public report: `qdc…trbt`
- Status during activation: healthy, new, empty, and without application data
- Data API: enabled with automatic table exposure disabled and automatic RLS enabled
- The user explicitly approved project creation and then explicitly selected Mumbai.
- An initial empty Tokyo project created during region selection was permanently deleted before any migration or application data was applied. The approved Mumbai project is the only surviving Pratyusha project.
- A temporary dashboard token was created and revoked without use.
- A CLI login token was used for the activation, revoked after validation, and removed from local CLI state.
- A protected temporary API-key response was deleted after the browser-safe publishable key was written to the ignored local environment file.

No project was guessed and no unrelated Supabase project was modified.

## Tooling and link status

- Supabase CLI: `2.111.0`
- Availability: executed ephemerally with `npx --yes supabase@latest`; it was not added to Angular dependencies
- Node.js used for repository checks: `24.18.1`
- npm clean install: `11.16.0`
- Docker/container runtime: unavailable; linked `supabase test db` therefore could not start its Docker runner
- Remote database access: available during activation
- Link: exact approved project verified; local link state remains Git-ignored under `supabase/.temp/`

## Pre-migration state and plan

The remote project contained no application migration history, no application tables, and no production data. The initial reviewed plan contained:

1. `20260802120000_bilingual_cms_schema.sql` — enums, 15 application tables, keys, constraints, bilingual columns, timestamps, and indexes.
2. `20260802121000_security_rls_storage.sql` — fixed-search-path helpers, RLS, minimum grants, 49 application-table policies, update/publication triggers, two private image-only buckets, and five Storage object policies.
3. `20260802130000_current_admin_profile.sql` — secure, no-argument, `auth.uid()`-based current-profile RPC, executable only by `authenticated`.

Review found no drop, truncate, reset, destructive replacement, seed reset, anonymous lead insert, public administrator access, PDF policy, or existing-object conflict. Because the approved project was new and empty, there was no customer/private data to dump. No database dump was created or committed. The migration dry-run was reviewed before application.

## Applied migrations and corrections

All database pushes completed without a failed or partially applied migration. Live pgTAP execution then exposed two table-polymorphic trigger defects in `validate_publication()`:

- `20260802144500_fix_publication_trigger_record_access.sql` corrected the first invalid field access found on `site_settings`.
- `20260802151000_make_publication_validation_record_safe.sql` converted `NEW` and `OLD` to JSONB before table-specific validation, removing every direct table-specific record-field access.

The corrections were applied as forward migrations; previously applied history was not rewritten. Final local and remote histories match for all five migrations. Remote `db lint` reports no schema errors.

## Remote object validation

Validated against the live project:

- 15/15 expected application tables
- 15/15 primary keys
- 34 foreign keys
- 32 check constraints
- 47 indexes
- 14 reusable `updated_at` triggers
- 11 publication-validation triggers
- 49 public-schema table policies
- Seven expected helper functions with fixed `search_path = public, pg_temp`
- Six required `SECURITY DEFINER` helpers; `set_updated_at()` correctly remains invoker security
- `current_admin_profile()` is present, fixed-search-path, based on `auth.uid()`, returns only the active caller profile, denies anonymous execution, and is granted only to `authenticated`
- Expected English/Telugu fields and all five status/role enums are represented in generated types

## RLS and grants

- RLS is enabled on all 15 application tables.
- Anonymous users can read only policy-approved published content.
- Anonymous users cannot read drafts, administrators, leads, email logs, or audit logs and cannot modify CMS data or insert leads.
- Authenticated non-administrators and inactive administrators receive no CMS privileges.
- Editors may manage permitted CMS/media/lead records but cannot create owners or promote themselves.
- Owners may manage administrator profiles and permitted application records but remain subject to constraints.
- No broad authenticated policy and no direct public lead-insert policy exists.
- Table grants were independently checked: browser roles receive only the minimum grants required for RLS evaluation.

## Storage validation

Both expected buckets exist and are private:

| Bucket                  | Limit  | MIME allowlist        |
| ----------------------- | ------ | --------------------- |
| `public-media`          | 5 MiB  | JPEG, PNG, WebP, AVIF |
| `private-source-assets` | 10 MiB | JPEG, PNG, WebP, AVIF |

Five object policies allow published public reads and active-administrator private reads/image writes/deletes. There is no anonymous upload policy and no PDF, HTML, SVG, or arbitrary MIME allowance. Synthetic image-policy rows ran inside the pgTAP transaction and were rolled back, leaving no test object or test user in the remote project.

## pgTAP result

- Prepared assertions: 30
- Passed: 30
- Failed: 0
- Skipped: 0

Docker was unavailable, so the exact repository SQL was executed as `postgres` in the authenticated Supabase SQL editor inside a transaction. The test transaction rolled back its synthetic `auth.users`, profiles, content, lead, audit, and Storage rows. Test helper calls were corrected to use the unambiguous four-argument `throws_ok` overload; database policies were not weakened.

## Generated types and Angular integration

- `src/app/core/supabase/database.types.ts` was generated from the linked remote `public` schema (1,200 formatted lines).
- `SupabaseClientService` now uses `SupabaseClient<Database>` and `createClient<Database>`.
- Administrator/content enums and the `current_admin_profile()` payload are derived from generated types while presentation models remain separate.
- Real browser-safe values exist only in `.env.local`, mode `0600`, which Git ignores.
- The SSR server publishes the safe runtime configuration through a no-store JavaScript endpoint loaded before Angular hydration. The configured key and URL do not appear in SSR HTML, TransferState, or compiled browser bundles.
- Configured local `/admin/login` showed `Sign-in required` with enabled controls. Explicitly disabled mode still fails closed and issues no request to the Supabase project.
- Public content still uses the reviewed local repository and remains available when the endpoint/configuration is missing.

## Owner and live-auth status

- First-owner identity: **blocked — exact `FIRST_OWNER_EMAIL` not supplied**
- Owner Auth invitation: not sent
- Owner profile: not created
- Password: not created or requested
- Live owner credential login: pending
- Owner dashboard/session restoration/sign-out: pending

This is an external-input blocker only. The schema, RLS, Storage, generated types, and browser-safe runtime integration are complete.

## Quality and security results

- Format check: passed
- Lint: passed
- Type check: passed
- Vitest: 91/91 passed across 20 files
- Playwright: 45/45 passed
- Production SSR build: passed; one pre-existing component-style budget warning remains (`public-sales-page.scss`, 11.78 KiB against an 8 KiB warning threshold)
- npm clean-install audit: six moderate advisories; no automatic or forced dependency change was made
- Browser bundle and SSR exact-value scan: no configured publishable key, project URL/reference, privileged-key marker, password, or management token
- No privileged value is staged or tracked; `.env.local`, Supabase link state, build output, Playwright output, and PDF output remain ignored
- Admin routes remain noindex and absent from sitemap
- English/Telugu SSR, hydration, canonical/hreflang metadata, bilingual 404, images, language switching, responsive layouts, and enquiry draft retention pass

Operational-output note: a password generated on the abandoned pre-creation form appeared in local browser automation output before being regenerated; it was never used by the surviving Mumbai project. A later CLI dry-run displayed a short-lived `cli_login_postgres` session credential, and API-key metadata inspection displayed the public anonymous key plus only a masked/truncated service-role preview. The CLI credential was ephemeral, the reveal flag was never used, the temporary response file was deleted, and both access tokens were revoked. No current project database password, full privileged API key, or secret is present in repository files or build output. Because of these transient tool-output events, this report does not claim that no credential-like text ever appeared in execution logs; it confirms that no live persistent secret was committed or retained.

## Rollback and recovery notes

Do not reset the remote database or edit applied migrations. If a defect is found, add a narrowly scoped forward migration after reviewing the live state. The project was empty before activation, so there is no pre-activation application data to restore. Any future data-bearing change requires a supported backup/recovery check before migration.

## Remaining external requirements

1. Supply the exact approved `FIRST_OWNER_EMAIL` through the secure environment.
2. Complete the supported Supabase Auth invitation flow—never create a shared/default password.
3. Add/upsert the matching active owner profile only after the Auth identity exists.
4. Complete live owner login, profile RPC, dashboard, refresh restoration, sign-out, and cache/back-navigation tests.
5. Review the six moderate npm advisories in a separate dependency-maintenance step.

No full CMS editor, live public-content query, enquiry submission, email delivery, payment, appointment, deployment, or PDF feature was added.
