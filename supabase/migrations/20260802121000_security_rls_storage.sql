begin;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
begin
  new.updated_at = statement_timestamp();
  return new;
end;
$$;

create or replace function public.current_admin_role()
returns public.administrator_role
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select ap.role
  from public.admin_profiles as ap
  where ap.user_id = (select auth.uid())
    and ap.is_active
  limit 1
$$;

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.admin_profiles as ap
    where ap.user_id = (select auth.uid())
      and ap.is_active
  )
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(public.current_admin_role() = 'owner'::public.administrator_role, false)
$$;

create or replace function public.is_editor_or_owner()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(
    public.current_admin_role() in (
      'owner'::public.administrator_role,
      'editor'::public.administrator_role
    ),
    false
  )
$$;

create or replace function public.validate_publication()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  row_text text := lower(to_jsonb(new)::text);
  is_content_published boolean := coalesce(to_jsonb(new)->>'status', '') = 'published';
  media_is_published boolean := coalesce(to_jsonb(new)->>'status', '') = 'published';
  legal_is_published boolean := coalesce(to_jsonb(new)->>'review_status', '') = 'published';
begin
  if tg_table_name = 'site_settings' and new.is_published then
    if row_text ~ '(\[client input required|lorem ipsum|your number|your website|@yourhandle)' then
      raise exception using
        errcode = '23514',
        message = 'Published settings cannot contain unresolved review markers.';
    end if;
    if coalesce(lower(new.site_url), '') ~ '(localhost|127\.0\.0\.1|file:|/users/)' then
      raise exception using
        errcode = '23514',
        message = 'Published site settings cannot use a local or internal URL.';
    end if;
  elsif tg_table_name = 'legal_pages' and legal_is_published then
    if tg_op = 'INSERT' or old.review_status not in ('approved', 'published') then
      raise exception using
        errcode = '23514',
        message = 'A legal page must pass approved status before publication.';
    end if;
    if not new.is_visible or not new.is_indexable or new.published_at is null then
      raise exception using
        errcode = '23514',
        message = 'Published legal pages must be visible, indexable, and timestamped.';
    end if;
    if length(btrim(new.title_en)) = 0 or length(btrim(new.content_en)) = 0 then
      raise exception using errcode = '23514', message = 'Published legal content cannot be blank.';
    end if;
  elsif tg_table_name = 'media_assets' and media_is_published then
    if tg_op = 'INSERT' or old.status not in ('approved', 'published') then
      raise exception using
        errcode = '23514',
        message = 'A media asset must pass approved status before publication.';
    end if;
    if new.mime_type not in ('image/jpeg', 'image/png', 'image/webp', 'image/avif') then
      raise exception using errcode = '23514', message = 'Only approved image formats may publish.';
    end if;
    if new.is_public and new.bucket_name <> 'public-media' then
      raise exception using errcode = '23514', message = 'Public assets belong in public-media.';
    end if;
  elsif is_content_published then
    if tg_op = 'INSERT' or old.status not in ('approved', 'published') then
      raise exception using
        errcode = '23514',
        message = 'Content must pass approved status before publication.';
    end if;

    if row_text ~ '(\[client input required|lorem ipsum|your number|your website|@yourhandle)' then
      raise exception using
        errcode = '23514',
        message = 'Published content cannot contain unresolved review markers.';
    end if;

    if tg_table_name in (
      'page_sections',
      'products',
      'ritual_items',
      'faqs',
      'founder_profiles',
      'testimonials',
      'contact_settings',
      'seo_pages'
    ) and (not new.is_visible or new.published_at is null) then
      raise exception using
        errcode = '23514',
        message = 'Published content must be visible and have published_at.';
    end if;

    if tg_table_name = 'products' and (
      length(btrim(new.name_en)) = 0 or length(btrim(new.name_te)) = 0
    ) then
      raise exception using errcode = '23514', message = 'Published product names cannot be blank.';
    end if;

    if tg_table_name = 'faqs' and (
      length(btrim(new.question_en)) = 0
      or length(btrim(new.question_te)) = 0
      or length(btrim(new.answer_en)) = 0
      or length(btrim(new.answer_te)) = 0
    ) then
      raise exception using errcode = '23514', message = 'Published FAQ questions and answers cannot be blank.';
    end if;

    if tg_table_name = 'testimonials' then
      if not new.customer_consent or new.consent_recorded_at is null then
        raise exception using
          errcode = '23514',
          message = 'Testimonials require recorded customer consent before publication.';
      end if;
      if new.media_asset_id is not null and not new.image_consent then
        raise exception using
          errcode = '23514',
          message = 'A testimonial image requires explicit image consent.';
      end if;
    end if;

    if tg_table_name = 'seo_pages' then
      if new.is_indexable and (
        lower(new.canonical_path_en) ~ '(localhost|127\.0\.0\.1|file:|/users/|[a-z]:\\)'
        or coalesce(lower(new.canonical_path_te), '') ~ '(localhost|127\.0\.0\.1|file:|/users/|[a-z]:\\)'
      ) then
        raise exception using
          errcode = '23514',
          message = 'Indexable SEO canonicals cannot use local or internal paths.';
      end if;
      if new.og_image_asset_id is not null and not exists (
        select 1
        from public.media_assets as ma
        where ma.id = new.og_image_asset_id
          and ma.status = 'published'
          and ma.is_public
          and ma.bucket_name = 'public-media'
      ) then
        raise exception using
          errcode = '23514',
          message = 'Open Graph images must be approved published public media.';
      end if;
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.validate_publication() from public, anon, authenticated;
revoke all on function public.current_admin_role() from public, anon;
revoke all on function public.is_active_admin() from public, anon;
revoke all on function public.is_owner() from public, anon;
revoke all on function public.is_editor_or_owner() from public, anon;
grant execute on function public.current_admin_role() to authenticated;
grant execute on function public.is_active_admin() to authenticated;
grant execute on function public.is_owner() to authenticated;
grant execute on function public.is_editor_or_owner() to authenticated;

create trigger admin_profiles_updated_at before update on public.admin_profiles
for each row execute function public.set_updated_at();
create trigger media_assets_updated_at before update on public.media_assets
for each row execute function public.set_updated_at();
create trigger site_settings_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();
create trigger page_sections_updated_at before update on public.page_sections
for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products
for each row execute function public.set_updated_at();
create trigger ritual_items_updated_at before update on public.ritual_items
for each row execute function public.set_updated_at();
create trigger faqs_updated_at before update on public.faqs
for each row execute function public.set_updated_at();
create trigger founder_profiles_updated_at before update on public.founder_profiles
for each row execute function public.set_updated_at();
create trigger testimonials_updated_at before update on public.testimonials
for each row execute function public.set_updated_at();
create trigger contact_settings_updated_at before update on public.contact_settings
for each row execute function public.set_updated_at();
create trigger seo_pages_updated_at before update on public.seo_pages
for each row execute function public.set_updated_at();
create trigger legal_pages_updated_at before update on public.legal_pages
for each row execute function public.set_updated_at();
create trigger leads_updated_at before update on public.leads
for each row execute function public.set_updated_at();
create trigger email_delivery_logs_updated_at before update on public.email_delivery_logs
for each row execute function public.set_updated_at();

create trigger validate_site_settings before insert or update on public.site_settings
for each row execute function public.validate_publication();
create trigger validate_page_sections before insert or update on public.page_sections
for each row execute function public.validate_publication();
create trigger validate_products before insert or update on public.products
for each row execute function public.validate_publication();
create trigger validate_ritual_items before insert or update on public.ritual_items
for each row execute function public.validate_publication();
create trigger validate_faqs before insert or update on public.faqs
for each row execute function public.validate_publication();
create trigger validate_founder_profiles before insert or update on public.founder_profiles
for each row execute function public.validate_publication();
create trigger validate_testimonials before insert or update on public.testimonials
for each row execute function public.validate_publication();
create trigger validate_contact_settings before insert or update on public.contact_settings
for each row execute function public.validate_publication();
create trigger validate_seo_pages before insert or update on public.seo_pages
for each row execute function public.validate_publication();
create trigger validate_legal_pages before insert or update on public.legal_pages
for each row execute function public.validate_publication();
create trigger validate_media_assets before insert or update on public.media_assets
for each row execute function public.validate_publication();

alter table public.admin_profiles enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;
alter table public.page_sections enable row level security;
alter table public.products enable row level security;
alter table public.ritual_items enable row level security;
alter table public.faqs enable row level security;
alter table public.founder_profiles enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_settings enable row level security;
alter table public.seo_pages enable row level security;
alter table public.legal_pages enable row level security;
alter table public.leads enable row level security;
alter table public.email_delivery_logs enable row level security;
alter table public.audit_logs enable row level security;

create policy "Owners manage administrator profiles"
on public.admin_profiles for all to authenticated
using ((select public.is_owner()))
with check ((select public.is_owner()));

create policy "Published media metadata is public"
on public.media_assets for select to anon, authenticated
using (status = 'published' and is_public and bucket_name = 'public-media');
create policy "Active administrators read media metadata"
on public.media_assets for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create media metadata"
on public.media_assets for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update media metadata"
on public.media_assets for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published site settings are public"
on public.site_settings for select to anon, authenticated
using (is_published);
create policy "Active administrators read site settings"
on public.site_settings for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create site settings"
on public.site_settings for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update site settings"
on public.site_settings for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published page sections are public"
on public.page_sections for select to anon, authenticated
using (status = 'published' and is_visible and published_at is not null);
create policy "Active administrators read page sections"
on public.page_sections for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create page sections"
on public.page_sections for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update page sections"
on public.page_sections for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published products are public"
on public.products for select to anon, authenticated
using (status = 'published' and is_visible and published_at is not null);
create policy "Active administrators read products"
on public.products for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create products"
on public.products for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update products"
on public.products for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published ritual items are public"
on public.ritual_items for select to anon, authenticated
using (status = 'published' and is_visible and published_at is not null);
create policy "Active administrators read ritual items"
on public.ritual_items for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create ritual items"
on public.ritual_items for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update ritual items"
on public.ritual_items for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published FAQs are public"
on public.faqs for select to anon, authenticated
using (status = 'published' and is_visible and published_at is not null);
create policy "Active administrators read FAQs"
on public.faqs for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create FAQs"
on public.faqs for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update FAQs"
on public.faqs for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published founder profiles are public"
on public.founder_profiles for select to anon, authenticated
using (status = 'published' and is_visible and published_at is not null);
create policy "Active administrators read founder profiles"
on public.founder_profiles for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create founder profiles"
on public.founder_profiles for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update founder profiles"
on public.founder_profiles for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Consented published testimonials are public"
on public.testimonials for select to anon, authenticated
using (
  status = 'published'
  and is_visible
  and published_at is not null
  and customer_consent
  and consent_recorded_at is not null
  and (media_asset_id is null or image_consent)
);
create policy "Active administrators read testimonials"
on public.testimonials for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create testimonials"
on public.testimonials for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update testimonials"
on public.testimonials for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published contact settings are public"
on public.contact_settings for select to anon, authenticated
using (status = 'published' and is_visible and published_at is not null);
create policy "Active administrators read contact settings"
on public.contact_settings for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create contact settings"
on public.contact_settings for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update contact settings"
on public.contact_settings for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published indexable SEO rows are public"
on public.seo_pages for select to anon, authenticated
using (
  status = 'published'
  and is_visible
  and is_indexable
  and published_at is not null
);
create policy "Active administrators read SEO rows"
on public.seo_pages for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create SEO rows"
on public.seo_pages for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update SEO rows"
on public.seo_pages for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Published legal pages are public"
on public.legal_pages for select to anon, authenticated
using (review_status = 'published' and is_visible and published_at is not null);
create policy "Active administrators read legal pages"
on public.legal_pages for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators create legal pages"
on public.legal_pages for insert to authenticated
with check ((select public.is_editor_or_owner()));
create policy "Active administrators update legal pages"
on public.legal_pages for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Active administrators read leads"
on public.leads for select to authenticated
using ((select public.is_editor_or_owner()));
create policy "Active administrators update leads"
on public.leads for update to authenticated
using ((select public.is_editor_or_owner()))
with check ((select public.is_editor_or_owner()));

create policy "Active administrators read email delivery logs"
on public.email_delivery_logs for select to authenticated
using ((select public.is_editor_or_owner()));

create policy "Owners read audit logs"
on public.audit_logs for select to authenticated
using ((select public.is_owner()));

revoke all on all tables in schema public from public, anon, authenticated;
grant select on public.media_assets, public.site_settings, public.page_sections, public.products,
  public.ritual_items, public.faqs, public.founder_profiles, public.testimonials,
  public.contact_settings, public.seo_pages, public.legal_pages to anon;
grant select, insert, update, delete on public.admin_profiles to authenticated;
grant select, insert, update on public.media_assets,
  public.site_settings, public.page_sections, public.products, public.ritual_items,
  public.faqs, public.founder_profiles, public.testimonials, public.contact_settings,
  public.seo_pages, public.legal_pages to authenticated;
grant select, update on public.leads to authenticated;
grant select on public.email_delivery_logs, public.audit_logs to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'public-media',
    'public-media',
    false,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  ),
  (
    'private-source-assets',
    'private-source-assets',
    false,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Published public media objects are readable"
on storage.objects for select to anon, authenticated
using (
  bucket_id = 'public-media'
  and exists (
    select 1
    from public.media_assets as ma
    where ma.bucket_name = storage.objects.bucket_id
      and ma.object_path = storage.objects.name
      and ma.status = 'published'
      and ma.is_public
  )
);

create policy "Administrators read private source objects"
on storage.objects for select to authenticated
using (
  bucket_id = 'private-source-assets'
  and (select public.is_editor_or_owner())
);

create policy "Administrators upload approved image formats"
on storage.objects for insert to authenticated
with check (
  bucket_id in ('public-media', 'private-source-assets')
  and (select public.is_editor_or_owner())
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
  and (
    bucket_id = 'private-source-assets'
    or (storage.foldername(name))[1] in ('products', 'founder', 'seo', 'legal', 'general')
  )
);

create policy "Administrators update approved image objects"
on storage.objects for update to authenticated
using (
  bucket_id in ('public-media', 'private-source-assets')
  and (select public.is_editor_or_owner())
)
with check (
  bucket_id in ('public-media', 'private-source-assets')
  and (select public.is_editor_or_owner())
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
  and (
    bucket_id = 'private-source-assets'
    or (storage.foldername(name))[1] in ('products', 'founder', 'seo', 'legal', 'general')
  )
);

create policy "Administrators delete media objects"
on storage.objects for delete to authenticated
using (
  bucket_id in ('public-media', 'private-source-assets')
  and (select public.is_editor_or_owner())
);

commit;
