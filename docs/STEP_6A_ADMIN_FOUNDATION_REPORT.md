# Step 6A — Angular Administration Foundation

## Scope and baseline

- Repository: `reddyprasadkv-sunsolv/pratyusha-mangalagiri`
- Branch: `feature/angular-premium-sales-page`
- Baseline: `93a2e9e0db65d41ba24cc6ad6e21ab0a586fc195`
- Project link: absent
- Remote migration: not applied

Step 6A adds only the secure administration foundation. `/admin/login`, `/admin`, and `/admin/dashboard` are functional; all future CMS modules are disabled route-ready navigation definitions labelled for Step 6B.

## Architecture

Admin routes use Angular client rendering and `X-Robots-Tag: noindex, nofollow`; public English/Telugu routes remain request-time SSR. Public and admin layouts are separated so no public header, announcement, cookie notice, or footer wraps administration pages. Protected data is never present in admin SSR HTML.

Authentication uses the Step 5 Supabase client foundation, a signal state machine, one auth-state subscription, coalesced active-profile validation, safe sign-out, and generic error mapping. A new version-controlled `current_admin_profile()` migration returns only the signed-in user's active profile through a fixed-search-path security-definer function. The migration is not applied remotely.

## Security and scope boundaries

- Supabase disabled or incomplete: login renders, controls are disabled, no request occurs, and guards fail closed.
- Active `owner` and `editor`: dashboard access; capabilities remain backed by RLS.
- Missing/inactive profile: denied and signed out.
- Owner-only capabilities: hidden from editors and protected by dedicated guard/RLS layers.
- Return URLs: restricted to internal `/admin` paths.
- Admin metadata: no canonical, public Open Graph, alternates, or JSON-LD.
- No public signup, hardcoded credentials, fake user, fake counts, raw component queries, live public CMS, lead insertion, email, payment, appointment, or PDF feature.

## Validation

The final quality gate ran with the repository-pinned Node.js 24.18.1 runtime:

| Check                         | Result                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| Clean dependency installation | Passed; 515 packages installed from the lockfile                                                  |
| Prettier                      | Passed                                                                                            |
| TypeScript type-check         | Passed for application, unit-test, and Playwright configurations                                  |
| ESLint                        | Passed with no errors                                                                             |
| Vitest                        | 20 files passed; 87 tests passed                                                                  |
| Production Angular SSR build  | Passed; 75.64 kB initial browser bundle, 15.99 kB estimated transfer                              |
| Playwright                    | 45 tests passed across admin/public SSR and 320–1920 px responsive coverage                       |
| Admin SEO                     | Client-rendered; `noindex, nofollow` metadata and response header verified                        |
| Secret/source scan            | Passed; no credential, service-role key, hardcoded administrator, or production project URL found |
| Browser-bundle scan           | Passed; no project URL, JWT-like value, or service-role marker found                              |
| npm high-severity audit       | Passed; no high or critical advisories                                                            |

The advisory report retains six moderate transitive development-tool findings through Angular CLI/MCP/Hono. npm offers only a forced breaking downgrade, so Step 6A does not apply that unsafe change. The existing public sales-page SCSS budget warning remains unchanged at 11.78 kB and does not fail the build.

Database pgTAP now contains 30 prepared cases, including current-profile isolation. It was not run because no approved Supabase project, local CLI, or container stack is available; the new migration also remains unapplied.

## External blockers

Live authentication requires an exact approved Supabase project, applied and tested migrations, generated database types, approved runtime public configuration, and an explicitly approved first-owner identity. None was guessed or created.
