# Angular Administration Architecture

## Scope

Step 6A provides secure administrator authentication, guarded client-rendered routes, a role-aware shell, dashboard foundation, typed CMS repository contracts, safe errors, notifications, and disabled-backend handling. It does not implement CMS editors, live public content, lead submission, email, payments, appointments, or PDFs.

## Route structure and rendering

| Route              | Rendering | Access                                            | Result                                      |
| ------------------ | --------- | ------------------------------------------------- | ------------------------------------------- |
| `/admin/login`     | Client    | Signed-out or unavailable backend                 | Login/configuration-safe page               |
| `/admin`           | Client    | Active owner/editor                               | Redirects to `/admin/dashboard`             |
| `/admin/dashboard` | Client    | Active owner/editor                               | Protected dashboard foundation              |
| Future admin paths | None yet  | Role-aware navigation definitions remain disabled | Clearly labelled `Step 6B`, never navigable |

`app.routes.server.ts` assigns `RenderMode.Client` and `X-Robots-Tag: noindex, nofollow` to `/admin` and `/admin/**`. Public `/` and `/te` remain request-time server rendered. Admin content is not prerendered, added to the sitemap, linked publicly, or emitted as public structured data.

## Authentication flow

1. `AdminAuthService` runs only when an admin route or component requests initialization.
2. Disabled or incomplete configuration fails closed without creating a Supabase client.
3. A browser session is restored through Supabase Auth.
4. `current_admin_profile()` uses `auth.uid()` to return only the caller's active administrator profile.
5. The application verifies matching user ID, active status, and an `owner` or `editor` role.
6. Missing, inactive, or malformed profiles are denied and signed out.
7. Provider errors are mapped to non-sensitive messages.

There is no public sign-up, social login, magic link, phone login, anonymous login, default password, or hardcoded administrator.

## Session lifecycle

The signal state uses `idle`, `checking`, `signed-out`, `authenticating`, `authenticated`, `unauthorized`, `expired`, `configuration-missing`, and `error`. Templates receive only safe state/profile fields—not raw sessions or tokens. A single auth-state subscription handles sign-in, sign-out, token refresh, user update, password recovery, and expiration. Repeated validation for the same user is coalesced.

Sign-out clears the active profile, role, protected-cache revision, and administration notification state before replacing browser history with `/admin/login`. It does not touch the public `site_language` preference.

## Guard model

- `adminAuthGuard`: requires an authenticated validated session.
- `activeAdminGuard`: requires an active profile.
- `editorOrOwnerGuard`: permits only the approved roles.
- `ownerGuard`: reserved for future owner-only routes.
- `adminLoginRedirectGuard`: sends an already authorised administrator to the dashboard.
- `adminNoindexGuard`: removes public metadata and applies admin `noindex, nofollow` metadata.

Guards return `UrlTree` redirects, fail closed during unavailable/invalid state, and pass return URLs through an internal `/admin` allowlist that rejects schemes, protocol-relative URLs, backslashes, non-admin paths, and login loops. UI capability checks complement—but never replace—the database RLS policies.

## Disabled backend

With `SUPABASE_ENABLED=false`, login remains usable as an informational page, all credential controls are disabled, no Supabase client or request is created, protected routes redirect to login, and the public SSR application is unaffected. Enabled but incomplete values use a different generic configuration message without revealing project values.

## Accessibility and responsive behaviour

The login and shell use semantic landmarks, one page H1, labelled controls, associated validation messages, live notifications, visible focus, skip links, native profile-menu semantics, accessible drawer controls, Escape handling, focus restoration, touch-sized controls, reduced-motion support, and responsive layouts. The shell switches to a mobile drawer below 1024 px and avoids horizontal overflow.
