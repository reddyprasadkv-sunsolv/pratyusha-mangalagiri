# Supabase Database Schema

## Source of truth

Versioned files under `supabase/migrations/` are the only schema source of truth. The current foundation creates 15 application tables and keeps English and Telugu in explicit `_en` and `_te` columns. JSONB is limited to flexible lists, captions/metadata, credentials, and audit snapshots.

## Status types

- `content_status`: `draft`, `client_review`, `approved`, `published`, `archived`
- `administrator_role`: `owner`, `editor`
- `lead_status`: `new`, `contacted`, `qualified`, `converted`, `closed`, `spam`
- `media_status`: `draft`, `approved`, `published`, `archived`
- `legal_review_status`: `draft`, `client_review`, `legal_review`, `approved`, `published`, `archived`

## Tables

| Table                 | Purpose                                          | Important relationships and controls                                                    |
| --------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `admin_profiles`      | Active CMS administrator allowlist               | PK/FK to `auth.users`; auth-user deletion cascades; only active owners manage profiles  |
| `media_assets`        | Database metadata for controlled Storage objects | Referenced by sections, products, founder, testimonials, and SEO; image MIME types only |
| `site_settings`       | Public site-level configuration                  | Unique `site_key`; no secrets; publication flag                                         |
| `page_sections`       | Ordered bilingual page content                   | Optional FK to `media_assets`; unique page/section pair                                 |
| `products`            | Bilingual product catalogue                      | Optional image FK; price remains nullable; price requires ISO currency                  |
| `ritual_items`        | Potential 21-day content items                   | Delivery/frequency/duration nullable; nothing is seeded                                 |
| `faqs`                | Bilingual visible/schema FAQ content             | Schema flag never bypasses publication/visibility RLS                                   |
| `founder_profiles`    | Founder copy and portrait link                   | Credentials remain flexible arrays but must pass approval before publication            |
| `testimonials`        | Consented customer statements                    | Optional product/media FKs; customer and image consent gates                            |
| `contact_settings`    | Optional verified contact information            | All fields nullable; nothing seeded                                                     |
| `seo_pages`           | Future bilingual SEO source                      | Optional approved social-image FK; localhost/internal canonicals rejected               |
| `legal_pages`         | Versioned bilingual legal content                | Dedicated legal review status; no content seeded or routed                              |
| `leads`               | Future enquiry records                           | Assignment FK targets active-admin profiles; anonymous inserts remain disabled          |
| `email_delivery_logs` | Future delivery-attempt metadata                 | Optional lead FK; no message bodies or provider secrets                                 |
| `audit_logs`          | Append-only application audit foundation         | Optional actor FK; client roles cannot insert/update/delete                             |

All mutable tables use `timestamptz` creation/update fields and one reusable `set_updated_at()` trigger. User attribution FKs use `on delete set null` where history should remain. Lead assignment also clears safely if an administrator profile is removed.

## Publication flow

CMS content follows `draft → client_review → approved → published`; archived content is retained. A database trigger rejects direct publication unless the previous state was `approved` (or already `published`). Legal and media records use their corresponding approval enums and also require an approved-to-published transition.

Published records must satisfy table-specific visibility, timestamps, nonblank required bilingual values, consent, media approval, and SEO rules. These unresolved markers are rejected at publication time while remaining permissible in drafts:

- `[CLIENT INPUT REQUIRED`
- `Lorem ipsum`
- `Your Number`
- `Your Website`
- `@YourHandle`

Publication is rejected rather than silently cleaning data.

## Seed status

`supabase/seed.sql` contains only one unpublished structural site setting and the four known reviewed product keys as hidden drafts. It contains no administrator, PII, contact information, price, availability, testimonial, credential, ritual inclusion, policy text, or published row.

## Future Step 6 mapping

Step 6 may map approved rows into dedicated CMS forms and generated `Database` types. The public page remains on `PUBLIC_CONTENT` during Step 5. Admin forms must preserve the separate bilingual fields, status transition, audit attribution, and nullable unapproved fields rather than flattening records into one JSON document.
