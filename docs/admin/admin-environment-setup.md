# Administration Environment Setup

## Required public names

| Name                | Default/requirement                       | Secret? | Behaviour                                             |
| ------------------- | ----------------------------------------- | ------- | ----------------------------------------------------- |
| `SUPABASE_ENABLED`  | `false` until explicitly approved         | No      | Disables client creation and login                    |
| `SUPABASE_URL`      | Approved HTTP/HTTPS project URL           | No      | Required only when enabled                            |
| `SUPABASE_ANON_KEY` | Approved public anonymous/publishable key | No      | Required only when enabled; RLS remains authoritative |

CLI-only names remain `SUPABASE_PROJECT_ID`, `SUPABASE_ACCESS_TOKEN`, and `SUPABASE_DB_PASSWORD`. They must stay in a protected shell/CI secret store and must never enter Angular, HTML, logs, screenshots, or browser bundles. Service-role keys, signing secrets, refresh tokens, administrator passwords, and SMTP credentials are prohibited.

## Disabled behaviour

The repository default is `SUPABASE_ENABLED=false`. `/admin/login` shows the approved configuration notice, disables email/password/toggle/submit controls, and issues no Supabase request. `/admin` and `/admin/dashboard` fail closed to login. Public English/Telugu SSR continues normally.

## Enabled behaviour

The exact project is approved and migrated. For local development, place the three browser-safe values in ignored `.env.local` and load that file into the SSR process environment. The Express SSR server exposes only the validated public runtime payload through `/api/supabase-config.js` with `private, no-store`; the blocking script is loaded before Angular hydration. Missing or malformed values disable login and display a generic incomplete-configuration message. The UI never prints the URL or key, and no configured value is compiled into browser bundles or injected into SSR HTML/TransferState.

An enabled client still grants no administration access by itself. Supabase Auth must return a valid session and `current_admin_profile()` must return the same user as an active `owner` or `editor`.

## External prerequisites

- Exact approved Supabase project reference and organisation
- Local/CI migration reset, database lint, and pgTAP success
- Remote migration dry-run and explicit approval
- Approved first-owner Auth identity and controlled profile bootstrap
- Deployment-specific public configuration injection and no-secret bundle inspection

The approved Mumbai project, migrations, generated types, configured-login state, first-owner Auth invitation, and matching active owner profile are verified. The invited owner must accept the email and establish credentials privately before live credential, session-restoration, dashboard, and sign-out testing can be completed.
