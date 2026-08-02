begin;

create extension if not exists pgcrypto with schema extensions;

create type public.content_status as enum (
  'draft',
  'client_review',
  'approved',
  'published',
  'archived'
);

create type public.administrator_role as enum ('owner', 'editor');
create type public.lead_status as enum (
  'new',
  'contacted',
  'qualified',
  'converted',
  'closed',
  'spam'
);
create type public.media_status as enum ('draft', 'approved', 'published', 'archived');
create type public.legal_review_status as enum (
  'draft',
  'client_review',
  'legal_review',
  'approved',
  'published',
  'archived'
);

create table public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (length(btrim(display_name)) between 1 and 120),
  role public.administrator_role not null default 'editor',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.media_assets (
  id uuid primary key default extensions.gen_random_uuid(),
  bucket_name text not null check (bucket_name in ('public-media', 'private-source-assets')),
  object_path text not null check (object_path !~ '(^|/)\.\.(/|$)'),
  original_filename text null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp', 'image/avif')),
  file_size_bytes bigint null check (file_size_bytes is null or file_size_bytes > 0),
  width integer null check (width is null or width > 0),
  height integer null check (height is null or height > 0),
  alt_text_en text null,
  alt_text_te text null,
  caption_en text null,
  caption_te text null,
  status public.media_status not null default 'draft',
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null,
  constraint media_assets_bucket_object_unique unique (bucket_name, object_path),
  constraint media_assets_public_bucket_check check (
    not is_public or bucket_name = 'public-media'
  )
);

create table public.site_settings (
  id uuid primary key default extensions.gen_random_uuid(),
  site_key text not null unique check (site_key ~ '^[a-z0-9][a-z0-9_-]*$'),
  brand_name text null,
  default_language text not null default 'en' check (default_language in ('en', 'te')),
  site_url text null,
  is_maintenance_mode boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.page_sections (
  id uuid primary key default extensions.gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  heading_en text null,
  heading_te text null,
  subheading_en text null,
  subheading_te text null,
  body_en text null,
  body_te text null,
  primary_cta_en text null,
  primary_cta_te text null,
  secondary_cta_en text null,
  secondary_cta_te text null,
  primary_cta_target text null,
  secondary_cta_target text null,
  media_asset_id uuid null references public.media_assets (id) on delete set null,
  display_order integer not null default 0 check (display_order >= 0),
  is_visible boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz null,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null,
  constraint page_sections_page_section_unique unique (page_key, section_key)
);

create table public.products (
  id uuid primary key default extensions.gen_random_uuid(),
  product_key text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name_en text not null,
  name_te text not null,
  short_description_en text null,
  short_description_te text null,
  long_description_en text null,
  long_description_te text null,
  benefits_en jsonb not null default '[]'::jsonb check (jsonb_typeof(benefits_en) = 'array'),
  benefits_te jsonb not null default '[]'::jsonb check (jsonb_typeof(benefits_te) = 'array'),
  audience_en jsonb not null default '[]'::jsonb check (jsonb_typeof(audience_en) = 'array'),
  audience_te jsonb not null default '[]'::jsonb check (jsonb_typeof(audience_te) = 'array'),
  image_asset_id uuid null references public.media_assets (id) on delete set null,
  image_alt_en text null,
  image_alt_te text null,
  material_en text null,
  material_te text null,
  available_sizes jsonb not null default '[]'::jsonb check (jsonb_typeof(available_sizes) = 'array'),
  price numeric(12, 2) null check (price is null or price >= 0),
  currency text null check (currency is null or currency ~ '^[A-Z]{3}$'),
  stock_status text null,
  display_order integer not null default 0 check (display_order >= 0),
  is_featured boolean not null default false,
  is_visible boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null,
  constraint products_price_currency_check check (
    (price is null and currency is null) or (price is not null and currency is not null)
  )
);

create table public.ritual_items (
  id uuid primary key default extensions.gen_random_uuid(),
  ritual_key text not null unique,
  title_en text not null,
  title_te text not null,
  description_en text null,
  description_te text null,
  delivery_method text null,
  frequency text null,
  duration_text text null,
  display_order integer not null default 0 check (display_order >= 0),
  is_visible boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.faqs (
  id uuid primary key default extensions.gen_random_uuid(),
  faq_key text not null unique,
  question_en text not null,
  question_te text not null,
  answer_en text not null,
  answer_te text not null,
  display_order integer not null default 0 check (display_order >= 0),
  is_visible boolean not null default false,
  include_in_schema boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.founder_profiles (
  id uuid primary key default extensions.gen_random_uuid(),
  profile_key text not null unique,
  name text not null,
  title_en text null,
  title_te text null,
  short_bio_en text null,
  short_bio_te text null,
  full_bio_en text null,
  full_bio_te text null,
  credentials_en jsonb not null default '[]'::jsonb check (jsonb_typeof(credentials_en) = 'array'),
  credentials_te jsonb not null default '[]'::jsonb check (jsonb_typeof(credentials_te) = 'array'),
  portrait_asset_id uuid null references public.media_assets (id) on delete set null,
  status public.content_status not null default 'draft',
  is_visible boolean not null default false,
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.testimonials (
  id uuid primary key default extensions.gen_random_uuid(),
  customer_name text not null,
  city_or_designation text null,
  product_id uuid null references public.products (id) on delete set null,
  testimonial_en text not null,
  testimonial_te text null,
  customer_consent boolean not null default false,
  image_consent boolean not null default false,
  consent_recorded_at timestamptz null,
  media_asset_id uuid null references public.media_assets (id) on delete set null,
  display_order integer not null default 0 check (display_order >= 0),
  is_visible boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.contact_settings (
  id uuid primary key default extensions.gen_random_uuid(),
  contact_key text not null unique,
  phone_number text null,
  whatsapp_number text null,
  email_address text null,
  instagram_handle text null,
  website_url text null,
  address_en text null,
  address_te text null,
  business_hours_en text null,
  business_hours_te text null,
  is_visible boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.seo_pages (
  id uuid primary key default extensions.gen_random_uuid(),
  route_key text not null unique,
  route_en text not null,
  route_te text null,
  meta_title_en text not null,
  meta_title_te text null,
  meta_description_en text not null,
  meta_description_te text null,
  og_title_en text null,
  og_title_te text null,
  og_description_en text null,
  og_description_te text null,
  og_image_asset_id uuid null references public.media_assets (id) on delete set null,
  og_image_alt_en text null,
  og_image_alt_te text null,
  canonical_path_en text not null,
  canonical_path_te text null,
  robots_directive text not null default 'noindex, nofollow',
  is_indexable boolean not null default false,
  is_visible boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.legal_pages (
  id uuid primary key default extensions.gen_random_uuid(),
  legal_key text not null unique,
  slug_en text not null unique,
  slug_te text null unique,
  title_en text not null,
  title_te text null,
  content_en text not null,
  content_te text null,
  version text null,
  review_status public.legal_review_status not null default 'draft',
  is_visible boolean not null default false,
  is_indexable boolean not null default false,
  published_at timestamptz null,
  effective_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references auth.users (id) on delete set null,
  updated_by uuid null references auth.users (id) on delete set null
);

create table public.leads (
  id uuid primary key default extensions.gen_random_uuid(),
  full_name text not null check (length(btrim(full_name)) between 1 and 80),
  mobile_number text not null check (mobile_number ~ '^[6-9][0-9]{9}$'),
  email_address text null,
  city text null,
  requirement_key text not null,
  preferred_language text not null check (preferred_language in ('en', 'te')),
  message text null,
  consent_given boolean not null check (consent_given),
  consent_text_version text null,
  source_page text not null,
  status public.lead_status not null default 'new',
  assigned_to uuid null references public.admin_profiles (user_id) on delete set null,
  internal_notes text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  contacted_at timestamptz null,
  converted_at timestamptz null
);

create table public.email_delivery_logs (
  id uuid primary key default extensions.gen_random_uuid(),
  lead_id uuid null references public.leads (id) on delete set null,
  message_type text not null,
  provider text null,
  provider_message_id text null,
  delivery_status text not null,
  attempt_number integer not null default 1 check (attempt_number > 0),
  error_code text null,
  error_summary text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default extensions.gen_random_uuid(),
  actor_user_id uuid null references auth.users (id) on delete set null,
  action text not null,
  entity_table text not null,
  entity_id uuid null,
  previous_values jsonb null,
  new_values jsonb null,
  created_at timestamptz not null default now(),
  request_context jsonb null
);

create index admin_profiles_active_role_idx on public.admin_profiles (is_active, role);
create index media_assets_public_status_idx on public.media_assets (is_public, status);
create index page_sections_public_order_idx on public.page_sections (page_key, status, is_visible, display_order);
create index products_public_order_idx on public.products (status, is_visible, display_order);
create index ritual_items_public_order_idx on public.ritual_items (status, is_visible, display_order);
create index faqs_public_order_idx on public.faqs (status, is_visible, display_order);
create index founder_profiles_public_idx on public.founder_profiles (status, is_visible);
create index testimonials_public_order_idx on public.testimonials (status, is_visible, display_order);
create index contact_settings_public_idx on public.contact_settings (status, is_visible);
create index seo_pages_public_idx on public.seo_pages (status, is_visible, is_indexable);
create index legal_pages_public_idx on public.legal_pages (review_status, is_visible, is_indexable);
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
create index leads_mobile_idx on public.leads (mobile_number);
create index leads_email_idx on public.leads (lower(email_address)) where email_address is not null;
create index leads_assigned_to_idx on public.leads (assigned_to) where assigned_to is not null;
create index email_delivery_logs_lead_idx on public.email_delivery_logs (lead_id, created_at desc);
create index audit_logs_entity_idx on public.audit_logs (entity_table, entity_id, created_at desc);
create index audit_logs_actor_idx on public.audit_logs (actor_user_id, created_at desc);

commit;
