# Backend Environment Variables

No values are committed. `.env.example` contains names only.

| Variable                | Allowed location                             | Browser-visible? | Purpose                                                                 |
| ----------------------- | -------------------------------------------- | ---------------- | ----------------------------------------------------------------------- |
| `SUPABASE_ENABLED`      | Angular public runtime/build configuration   | Yes              | Defaults to `false`; Step 5 remains local-content-only                  |
| `SUPABASE_URL`          | Angular public runtime/build configuration   | Yes              | Public project API URL; validated as HTTP/HTTPS                         |
| `SUPABASE_ANON_KEY`     | Angular public runtime/build configuration   | Yes              | Public anonymous/publishable client credential; never grants around RLS |
| `SUPABASE_PROJECT_ID`   | Developer shell or protected CI secret store | No               | Exact approved project reference for CLI linking                        |
| `SUPABASE_ACCESS_TOKEN` | Protected developer/CI secret store only     | No               | CLI authentication                                                      |
| `SUPABASE_DB_PASSWORD`  | Protected developer/CI secret store only     | No               | Controlled migration connection when required                           |

The Angular source must never reference or receive a service-role key, JWT signing secret, database password, access token, SMTP secret, refresh token, or administrator credential. Server-only CLI variables must not use an Angular/browser exposure prefix.

When disabled, no Supabase client is created. If enabled values are missing or malformed, the client foundation returns unavailable, emits only a generic warning, and the repository falls back to local reviewed content without exposing the invalid value.
