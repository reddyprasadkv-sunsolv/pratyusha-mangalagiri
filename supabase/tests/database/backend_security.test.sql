begin;

create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions, auth, storage;
select plan(28);

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-0000-0000-000000000001',
    'authenticated',
    'authenticated',
    'owner@example.invalid',
    '',
    '{}'::jsonb,
    '{}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-0000-0000-000000000002',
    'authenticated',
    'authenticated',
    'editor@example.invalid',
    '',
    '{}'::jsonb,
    '{}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-0000-0000-000000000003',
    'authenticated',
    'authenticated',
    'inactive@example.invalid',
    '',
    '{}'::jsonb,
    '{}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-0000-0000-000000000004',
    'authenticated',
    'authenticated',
    'user@example.invalid',
    '',
    '{}'::jsonb,
    '{}'::jsonb,
    now(),
    now()
  );

insert into public.admin_profiles (user_id, display_name, role, is_active)
values
  ('10000000-0000-0000-0000-000000000001', 'Test Owner', 'owner', true),
  ('10000000-0000-0000-0000-000000000002', 'Test Editor', 'editor', true),
  ('10000000-0000-0000-0000-000000000003', 'Inactive Editor', 'editor', false);

insert into public.site_settings (site_key, default_language, is_published)
values ('primary', 'en', false)
on conflict (site_key) do nothing;

insert into public.page_sections (
  page_key,
  section_key,
  heading_en,
  heading_te,
  is_visible,
  status,
  published_at
)
values
  ('home', 'published-test', 'Published', 'ప్రచురించబడింది', false, 'approved', null),
  ('home', 'draft-test', 'Draft', 'డ్రాఫ్ట్', false, 'draft', null);
update public.page_sections
set is_visible = true, status = 'published', published_at = now()
where section_key = 'published-test';

insert into public.products (
  product_key,
  slug,
  name_en,
  name_te,
  is_visible,
  status,
  published_at
)
values
  ('published-test', 'published-test', 'Published Product', 'ప్రచురించిన ఉత్పత్తి', false, 'approved', null),
  ('draft-test', 'draft-test', 'Draft Product', 'డ్రాఫ్ట్ ఉత్పత్తి', false, 'draft', null);
update public.products
set is_visible = true, status = 'published', published_at = now()
where product_key = 'published-test';

insert into public.leads (
  full_name,
  mobile_number,
  requirement_key,
  preferred_language,
  consent_given,
  source_page
)
values ('Synthetic Lead', '9876543210', 'test', 'en', true, '/test');

insert into public.audit_logs (action, entity_table)
values ('test.action', 'test_entity');

insert into storage.objects (bucket_id, name)
values ('private-source-assets', 'tests/private-image.webp');

set local role anon;
select results_eq(
  $$select count(*)::bigint from public.page_sections where section_key = 'published-test'$$,
  array[1::bigint],
  'Anonymous users can read a published visible page section'
);
select results_eq(
  $$select count(*)::bigint from public.page_sections where section_key = 'draft-test'$$,
  array[0::bigint],
  'Anonymous users cannot read draft page sections'
);
select throws_ok(
  $$insert into public.page_sections (page_key, section_key) values ('test', 'anon-write')$$,
  'Anonymous users cannot modify page sections'
);
select results_eq(
  $$select count(*)::bigint from public.products where product_key = 'published-test'$$,
  array[1::bigint],
  'Anonymous users can read published visible products'
);
select results_eq(
  $$select count(*)::bigint from public.products where product_key = 'draft-test'$$,
  array[0::bigint],
  'Anonymous users cannot read unpublished products'
);
select throws_ok(
  $$insert into public.products (product_key, slug, name_en, name_te) values ('anon', 'anon', 'Anon', 'Anon')$$,
  'Anonymous users cannot insert products'
);
select results_eq(
  $$select count(*)::bigint from public.leads$$,
  array[0::bigint],
  'Anonymous users cannot read leads'
);
select throws_ok(
  $$insert into public.leads (full_name, mobile_number, requirement_key, preferred_language, consent_given, source_page) values ('Anon', '9876543211', 'test', 'en', true, '/')$$,
  'Anonymous users cannot insert leads directly'
);
select results_eq(
  $$select count(*)::bigint from public.admin_profiles$$,
  array[0::bigint],
  'Anonymous users cannot read administrator profiles'
);
reset role;

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000004', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;
select results_eq(
  $$update public.products set display_order = 9 where product_key = 'draft-test' returning 1$$,
  $$values (1) limit 0$$,
  'A normal authenticated user cannot manage CMS content'
);
reset role;

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000003', true);
set local role authenticated;
select results_eq(
  $$update public.products set display_order = 8 where product_key = 'draft-test' returning 1$$,
  $$values (1) limit 0$$,
  'An inactive administrator cannot manage content'
);
reset role;

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000002', true);
set local role authenticated;
select lives_ok(
  $$update public.products set display_order = 7 where product_key = 'draft-test'$$,
  'An editor may manage permitted content'
);
select results_eq(
  $$update public.admin_profiles set role = 'owner' where user_id = '10000000-0000-0000-0000-000000000002' returning role::text$$,
  $$values ('owner'::text) limit 0$$,
  'An editor cannot promote themselves'
);
select throws_ok(
  $$insert into public.admin_profiles (user_id, display_name, role) values ('10000000-0000-0000-0000-000000000004', 'Promoted User', 'owner')$$,
  'An editor cannot create owners'
);
reset role;

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000001', true);
set local role authenticated;
select lives_ok(
  $$update public.admin_profiles set display_name = 'Updated Editor' where user_id = '10000000-0000-0000-0000-000000000002'$$,
  'An owner may manage administrator profiles'
);
reset role;

insert into public.testimonials (customer_name, testimonial_en, status)
values ('Synthetic', 'Synthetic statement', 'approved');
select throws_ok(
  $$update public.testimonials set is_visible = true, status = 'published', published_at = now() where customer_name = 'Synthetic'$$,
  'Testimonials cannot publish without consent'
);

insert into public.legal_pages (
  legal_key,
  slug_en,
  title_en,
  content_en,
  review_status
)
values ('test-legal', 'test-legal', 'Test legal', 'Test legal body', 'draft');
select throws_ok(
  $$update public.legal_pages set review_status = 'published', is_visible = true, is_indexable = true, published_at = now() where legal_key = 'test-legal'$$,
  'Legal pages cannot publish before approved review status'
);

insert into public.seo_pages (
  route_key,
  route_en,
  meta_title_en,
  meta_description_en,
  canonical_path_en,
  status
)
values ('bad-local', '/', 'Title', 'Description', 'http://localhost:4200/', 'approved');
select throws_ok(
  $$update public.seo_pages set is_indexable = true, is_visible = true, status = 'published', published_at = now() where route_key = 'bad-local'$$,
  'Indexable SEO rows using localhost cannot publish'
);
insert into public.page_sections (page_key, section_key, heading_en, status)
values ('home', 'bad-marker', '[CLIENT INPUT REQUIRED: title]', 'approved');
select throws_ok(
  $$update public.page_sections set is_visible = true, status = 'published', published_at = now() where section_key = 'bad-marker'$$,
  'Unresolved internal markers cannot publish'
);
select throws_ok(
  $$insert into public.media_assets (bucket_name, object_path, mime_type, status, is_public) values ('public-media', 'general/file.pdf', 'application/pdf', 'published', true)$$,
  'Public PDF media cannot publish'
);

set local role anon;
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('public-media', 'general/anon.webp')$$,
  'Public storage rejects anonymous uploads'
);
select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'private-source-assets'$$,
  array[0::bigint],
  'Private storage rejects public reads'
);
reset role;

update public.site_settings
set updated_at = '2000-01-01 00:00:00+00'
where site_key = 'primary';
update public.site_settings
set is_maintenance_mode = true
where site_key = 'primary';
select ok(
  (select updated_at > '2000-01-01 00:00:00+00' from public.site_settings where site_key = 'primary'),
  'The reusable updated_at trigger updates mutable records'
);

set local role anon;
select results_eq(
  $$select count(*)::bigint from public.audit_logs$$,
  array[0::bigint],
  'Public users cannot read audit logs'
);
reset role;

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000002', true);
set local role authenticated;
select throws_ok(
  $$delete from public.audit_logs$$,
  'Editors cannot delete audit logs'
);
reset role;

select results_eq(
  $$select count(*)::bigint from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relname in ('admin_profiles','media_assets','site_settings','page_sections','products','ritual_items','faqs','founder_profiles','testimonials','contact_settings','seo_pages','legal_pages','leads','email_delivery_logs','audit_logs') and not c.relrowsecurity$$,
  array[0::bigint],
  'No application table is missing RLS'
);
select results_eq(
  $$select count(*)::bigint from pg_policies where schemaname = 'public' and 'authenticated' = any(roles) and coalesce(qual, '') in ('', 'true') and coalesce(with_check, '') in ('', 'true')$$,
  array[0::bigint],
  'No broad authenticated-user policy exists'
);
select results_eq(
  $$select count(*)::bigint from pg_policies where schemaname = 'public' and tablename = 'leads' and cmd = 'INSERT'$$,
  array[0::bigint],
  'No direct public lead-insert policy exists'
);

select * from finish();
rollback;
