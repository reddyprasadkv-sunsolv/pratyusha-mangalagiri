# Row-Level Security and Grants Matrix

RLS is enabled on every application table. PostgreSQL grants are restricted separately; an authenticated JWT alone never provides administrator access. All administrator policies call fixed-search-path helpers that require an active `admin_profiles` row.

| Table                 | Anonymous select               | Anonymous insert | Authenticated non-admin | Editor      | Owner       | Notes                                                            |
| --------------------- | ------------------------------ | ---------------- | ----------------------- | ----------- | ----------- | ---------------------------------------------------------------- |
| `admin_profiles`      | No                             | No               | No                      | No          | Manage      | Role loading occurs through restricted helper; no self-promotion |
| `media_assets`        | Published public metadata only | No               | Public rows only        | Manage      | Manage      | Public record requires published image metadata                  |
| `site_settings`       | Published only                 | No               | Published only          | Manage      | Manage      | Must never contain secrets                                       |
| `page_sections`       | Published + visible            | No               | Published + visible     | Manage      | Manage      | Approval transition and marker validation                        |
| `products`            | Published + visible            | No               | Published + visible     | Manage      | Manage      | Price optional; no anonymous writes                              |
| `ritual_items`        | Published + visible            | No               | Published + visible     | Manage      | Manage      | All current inclusions remain unseeded                           |
| `faqs`                | Published + visible            | No               | Published + visible     | Manage      | Manage      | `include_in_schema` does not expand read access                  |
| `founder_profiles`    | Published + visible            | No               | Published + visible     | Manage      | Manage      | Unverified credentials must not publish                          |
| `testimonials`        | Published, visible, consented  | No               | Same public rows        | Manage      | Manage      | Media also requires image consent                                |
| `contact_settings`    | Published + visible            | No               | Published + visible     | Manage      | Manage      | No fake data seeded                                              |
| `seo_pages`           | Published, visible, indexable  | No               | Same public rows        | Manage      | Manage      | Local/internal canonicals rejected                               |
| `legal_pages`         | Published + visible            | No               | Published + visible     | Manage      | Manage      | Approved review transition required                              |
| `leads`               | No                             | No               | No                      | Read/update | Read/update | Insert is reserved for a future trusted server function          |
| `email_delivery_logs` | No                             | No               | No                      | Read        | Read        | Writes remain trusted-server/service operations only             |
| `audit_logs`          | No                             | No               | No                      | No          | Read        | Append-only from trusted secure application paths                |

## Helper security

- `current_admin_role()`, `is_active_admin()`, `is_owner()`, and `is_editor_or_owner()` use `auth.uid()`, accept no target user ID, use no dynamic SQL, and have a fixed `search_path`.
- Anonymous execution is revoked. Only `authenticated` receives execute rights.
- The functions read the allowlist as definer functions so RLS cannot recursively block their checks.
- Editors receive no policy on `admin_profiles`; therefore they cannot promote themselves, create owners, or reactivate accounts.

## Grants model

`PUBLIC`, `anon`, and `authenticated` table privileges are revoked before the minimum grants are re-applied. Anonymous users receive SELECT only on potentially public CMS tables. Authenticated users receive CMS DML grants, but RLS still requires an active editor or owner profile. Leads grant authenticated SELECT/UPDATE only; email/audit logs grant SELECT only. UUID keys avoid application sequences.

CMS records with approval history expose select/insert/update—not delete—to editor and owner clients. They are archived through status fields. Storage objects may be deleted by active administrators under the separate object policy, while database audit and content history remain protected.
