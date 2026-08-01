-- Additive bilingual CMS foundation for Pratyusha.
-- This migration creates new tables and does not delete or rename legacy fields.
-- Review, back up, and test in a Supabase preview branch before production use.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('owner', 'admin', 'editor')),
  created_at timestamptz not null default now()
);

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_cms_admin() from public;
grant execute on function public.is_cms_admin() to authenticated;

create table if not exists public.content_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title_en text,
  title_te text,
  subtitle_en text,
  subtitle_te text,
  description_en text,
  description_te text,
  button_text_en text,
  button_text_te text,
  alt_text_en text,
  alt_text_te text,
  meta_title_en text,
  meta_title_te text,
  meta_description_en text,
  meta_description_te text,
  content_en jsonb not null default '{}'::jsonb,
  content_te jsonb not null default '{}'::jsonb,
  status_en text not null default 'draft'
    check (status_en in ('draft', 'published', 'unpublished')),
  status_te text not null default 'draft'
    check (status_te in ('draft', 'published', 'unpublished')),
  published_at_en timestamptz,
  published_at_te timestamptz,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.legal_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug in (
      'privacy-policy',
      'terms-and-conditions',
      'refund-cancellation-policy',
      'disclaimer',
      'cookie-policy'
    )),
  title_en text,
  title_te text,
  content_en jsonb not null default '[]'::jsonb,
  content_te jsonb not null default '[]'::jsonb,
  meta_title_en text,
  meta_title_te text,
  meta_description_en text,
  meta_description_te text,
  status_en text not null default 'draft'
    check (status_en in ('draft', 'published', 'unpublished')),
  status_te text not null default 'draft'
    check (status_te in ('draft', 'published', 'unpublished')),
  last_reviewed_at_en timestamptz,
  last_reviewed_at_te timestamptz,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  mime_type text not null
    check (mime_type in ('image/jpeg', 'image/png', 'image/webp', 'image/avif')),
  file_size_bytes bigint not null check (file_size_bytes > 0 and file_size_bytes <= 10485760),
  width integer not null check (width >= 320),
  height integer not null check (height >= 320),
  alt_text_en text,
  alt_text_te text,
  focal_x numeric(5, 2) not null default 50 check (focal_x between 0 and 100),
  focal_y numeric(5, 2) not null default 50 check (focal_y between 0 and 100),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  is_client_portrait boolean not null default false,
  previous_asset_id uuid references public.media_assets(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  mobile text not null check (char_length(mobile) between 8 and 18),
  email text check (email is null or char_length(email) <= 254),
  city text check (city is null or char_length(city) <= 120),
  requirement text not null check (char_length(requirement) between 2 and 120),
  message text check (message is null or char_length(message) <= 2000),
  submission_language text not null check (submission_language in ('en', 'te')),
  source_url text not null check (char_length(source_url) <= 2048),
  utm_source text check (utm_source is null or char_length(utm_source) <= 200),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 200),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 200),
  consent_status boolean not null check (consent_status = true),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),
  is_deleted boolean not null default false,
  submitted_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_submitted_at_idx
  on public.leads(status, submitted_at desc)
  where is_deleted = false;

create table if not exists public.site_settings (
  id boolean primary key default true check (id = true),
  fallback_to_english boolean not null default false,
  browser_telugu_detection_enabled boolean not null default false,
  client_image_enabled boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id)
values (true)
on conflict (id) do nothing;

create table if not exists public.cms_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  locale text check (locale is null or locale in ('en', 'te')),
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.content_sections enable row level security;
alter table public.legal_pages enable row level security;
alter table public.media_assets enable row level security;
alter table public.leads enable row level security;
alter table public.site_settings enable row level security;
alter table public.cms_audit_log enable row level security;

create policy "Admins can read admin membership"
  on public.admin_users for select
  to authenticated
  using (public.is_cms_admin());

create policy "Admins manage bilingual content"
  on public.content_sections for all
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

create policy "Admins manage bilingual legal content"
  on public.legal_pages for all
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

create policy "Admins manage media metadata"
  on public.media_assets for all
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

create policy "Admins manage leads"
  on public.leads for all
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

create policy "Admins manage site settings"
  on public.site_settings for all
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

create policy "Admins read audit records"
  on public.cms_audit_log for select
  to authenticated
  using (public.is_cms_admin());

create policy "Admins create audit records"
  on public.cms_audit_log for insert
  to authenticated
  with check (public.is_cms_admin() and actor_id = auth.uid());

-- Public views expose only the published locale. Draft fields for the other
-- locale never appear in the view result.
create or replace view public.published_content_en
with (security_barrier = true)
as
select
  id,
  section_key,
  title_en as title,
  subtitle_en as subtitle,
  description_en as description,
  button_text_en as button_text,
  alt_text_en as alt_text,
  meta_title_en as meta_title,
  meta_description_en as meta_description,
  content_en as content,
  published_at_en as published_at,
  updated_at
from public.content_sections
where status_en = 'published';

create or replace view public.published_content_te
with (security_barrier = true)
as
select
  id,
  section_key,
  title_te as title,
  subtitle_te as subtitle,
  description_te as description,
  button_text_te as button_text,
  alt_text_te as alt_text,
  meta_title_te as meta_title,
  meta_description_te as meta_description,
  content_te as content,
  published_at_te as published_at,
  updated_at
from public.content_sections
where status_te = 'published';

create or replace view public.published_legal_en
with (security_barrier = true)
as
select
  id,
  slug,
  title_en as title,
  content_en as content,
  meta_title_en as meta_title,
  meta_description_en as meta_description,
  last_reviewed_at_en as last_reviewed_at,
  updated_at
from public.legal_pages
where status_en = 'published';

create or replace view public.published_legal_te
with (security_barrier = true)
as
select
  id,
  slug,
  title_te as title,
  content_te as content,
  meta_title_te as meta_title,
  meta_description_te as meta_description,
  last_reviewed_at_te as last_reviewed_at,
  updated_at
from public.legal_pages
where status_te = 'published';

revoke all on public.content_sections from anon;
revoke all on public.legal_pages from anon;
revoke all on public.media_assets from anon;
revoke all on public.leads from anon;
revoke all on public.leads from authenticated;
grant select, insert, update, delete on public.leads to authenticated;
grant select on public.published_content_en to anon, authenticated;
grant select on public.published_content_te to anon, authenticated;
grant select on public.published_legal_en to anon, authenticated;
grant select on public.published_legal_te to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Admins upload validated site media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'site-media'
    and public.is_cms_admin()
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
  );

create policy "Admins update site media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-media' and public.is_cms_admin())
  with check (
    bucket_id = 'site-media'
    and public.is_cms_admin()
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
  );

create policy "Admins archive site media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-media' and public.is_cms_admin());

comment on table public.content_sections is
  'Bilingual CMS fields. English and Telugu are edited and published independently.';
comment on table public.legal_pages is
  'Legal copy must be reviewed and approved by the client legal adviser before publication.';
comment on table public.leads is
  'Private lead records include submission locale, source URL, consent, and UTM attribution. Anonymous direct inserts stay disabled; a rate-limited, server-validated endpoint must own public submissions.';
