# Bilingual CMS and media handoff

The website now has separate English and Telugu routes and a bilingual admin
design. Public pages use English at `/` and Telugu at `/te`. Legal pages follow
the same route structure.

## Current preview status

- The private hosted preview uses versioned local content.
- English and Telugu copy are independent and are marked as draft in the admin
  preview.
- Save, publish, upload, and lead-storage actions stay locked until the client
  Supabase project and administrator accounts are supplied.
- English fallback for missing Telugu content is disabled by default.
- The language preference key is `site_language` and accepts only `en` or `te`.
- The lead form stores a temporary device-local draft only to preserve entered
  values while changing routes. It is not used as authoritative lead storage.

## Supabase activation

1. Create a Supabase preview branch or take a database backup.
2. Review and apply
   `supabase/migrations/20260730153000_bilingual_cms.sql`.
3. Add the first administrator UUID to `public.admin_users`.
4. Configure `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`; never expose the service-role key.
5. Import approved content into `content_sections` and `legal_pages`, mapping
   each language to its dedicated fields.
6. Verify the published English and Telugu views return only content whose
   matching locale status is `published`.
7. Connect authenticated admin mutations and audit logging.
8. Connect the lead form to the `leads` insert policy and add server-side rate
   limiting before public launch.

Do not remove a legacy content field until its values are backed up, mapped,
reviewed, and confirmed in both locale views. Rollback is achieved by disabling
the new queries and restoring the pre-migration database backup; the migration
does not delete legacy fields.

## Media rules

The approved optimized portrait is stored at:

`public/images/client-traditional-saree.webp`

The high-quality PNG source is retained locally under the ignored
`.openai/source-assets` directory and is not published or committed. When
Supabase Storage is connected, upload the source through a protected admin flow
and retain the WebP derivative for website delivery.

Uploads are restricted to JPEG, PNG, WebP, and AVIF, with a 10 MB maximum.
The admin must validate actual MIME type, extension, dimensions, file size, and
safe generated filename. Executable formats are never accepted.

## Legal approval

All Privacy Policy, Terms and Conditions, Refund and Cancellation Policy,
Disclaimer, and Cookie Policy content is draft. The client’s qualified legal
adviser must review and approve each language independently before production
publication. Draft legal records must never be indexed or exposed through the
public Supabase views.
