# Administrator Capability Matrix

Database RLS is authoritative. UI visibility and guards provide defence in depth and usable navigation, not a replacement for database enforcement.

| Capability                    | Editor | Owner | Database enforcement                  | UI enforcement                   | Notes                                    |
| ----------------------------- | :----: | :---: | ------------------------------------- | -------------------------------- | ---------------------------------------- |
| View dashboard                |  Yes   |  Yes  | Active-profile helper                 | Auth/active/role guards          | No live metrics in Step 6A               |
| Manage page content           |  Yes   |  Yes  | `is_editor_or_owner()` RLS            | Capability navigation            | Editor arrives in Step 6B                |
| Manage products               |  Yes   |  Yes  | `is_editor_or_owner()` RLS            | Capability navigation            | Editor arrives in Step 6B                |
| Manage 21-Day Ritual          |  Yes   |  Yes  | `is_editor_or_owner()` RLS            | Capability navigation            | Inclusion/delivery details need approval |
| Manage FAQs                   |  Yes   |  Yes  | `is_editor_or_owner()` RLS            | Capability navigation            | Bilingual fields remain separate         |
| Manage founder profile        |  Yes   |  Yes  | `is_editor_or_owner()` RLS            | Capability navigation            | Credentials require verification         |
| Manage testimonials           |  Yes   |  Yes  | RLS plus publication consent triggers | Capability navigation            | No fabricated testimonials               |
| Manage contact settings       |  Yes   |  Yes  | `is_editor_or_owner()` RLS            | Capability navigation            | Verified client details only             |
| Manage SEO drafts             |  Yes   |  Yes  | RLS plus publication validation       | Capability navigation            | Public Step 4 SEO remains local          |
| Manage legal drafts           |  Yes   |  Yes  | RLS plus legal review transition      | Capability navigation            | Final legal approval required            |
| Manage public media           |  Yes   |  Yes  | Storage and metadata RLS              | Capability navigation            | Image formats only                       |
| Read/manage leads             |  Yes   |  Yes  | Active-admin SELECT/UPDATE RLS        | Capability navigation            | Public inserts remain disabled           |
| Manage administrator profiles |   No   |  Yes  | Owner-only RLS                        | `ownerGuard` and owner-only item | No self-promotion or public provisioning |
| Read protected audit log      |   No   |  Yes  | Owner-only SELECT RLS                 | `ownerGuard` and owner-only item | Append-only trusted writes               |
| Manage site settings          |   No   |  Yes  | CMS RLS; security settings stay owner | `ownerGuard` and owner-only item | No secrets permitted in `site_settings`  |
