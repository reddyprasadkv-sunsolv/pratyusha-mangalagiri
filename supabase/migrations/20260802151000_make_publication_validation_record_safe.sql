begin;

create or replace function public.validate_publication()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  row_data jsonb := to_jsonb(new);
  old_data jsonb := case when tg_op = 'UPDATE' then to_jsonb(old) else '{}'::jsonb end;
  row_text text := lower(row_data::text);
  content_is_published boolean := coalesce(row_data->>'status', '') = 'published';
  legal_is_published boolean := coalesce(row_data->>'review_status', '') = 'published';
begin
  if tg_table_name = 'site_settings' then
    if coalesce((row_data->>'is_published')::boolean, false) then
      if row_text ~ '(\[client input required|lorem ipsum|your number|your website|@yourhandle)' then
        raise exception using
          errcode = '23514',
          message = 'Published settings cannot contain unresolved review markers.';
      end if;
      if coalesce(lower(row_data->>'site_url'), '') ~ '(localhost|127\.0\.0\.1|file:|/users/)' then
        raise exception using
          errcode = '23514',
          message = 'Published site settings cannot use a local or internal URL.';
      end if;
    end if;
  elsif tg_table_name = 'legal_pages' and legal_is_published then
    if tg_op = 'INSERT' or coalesce(old_data->>'review_status', '') not in ('approved', 'published') then
      raise exception using
        errcode = '23514',
        message = 'A legal page must pass approved status before publication.';
    end if;
    if not coalesce((row_data->>'is_visible')::boolean, false)
      or not coalesce((row_data->>'is_indexable')::boolean, false)
      or row_data->>'published_at' is null then
      raise exception using
        errcode = '23514',
        message = 'Published legal pages must be visible, indexable, and timestamped.';
    end if;
    if length(btrim(coalesce(row_data->>'title_en', ''))) = 0
      or length(btrim(coalesce(row_data->>'content_en', ''))) = 0 then
      raise exception using errcode = '23514', message = 'Published legal content cannot be blank.';
    end if;
  elsif tg_table_name = 'media_assets' and content_is_published then
    if tg_op = 'INSERT' or coalesce(old_data->>'status', '') not in ('approved', 'published') then
      raise exception using
        errcode = '23514',
        message = 'A media asset must pass approved status before publication.';
    end if;
    if coalesce(row_data->>'mime_type', '') not in (
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif'
    ) then
      raise exception using errcode = '23514', message = 'Only approved image formats may publish.';
    end if;
    if coalesce((row_data->>'is_public')::boolean, false)
      and coalesce(row_data->>'bucket_name', '') <> 'public-media' then
      raise exception using errcode = '23514', message = 'Public assets belong in public-media.';
    end if;
  elsif content_is_published then
    if tg_op = 'INSERT' or coalesce(old_data->>'status', '') not in ('approved', 'published') then
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
    ) and (
      not coalesce((row_data->>'is_visible')::boolean, false)
      or row_data->>'published_at' is null
    ) then
      raise exception using
        errcode = '23514',
        message = 'Published content must be visible and have published_at.';
    end if;

    if tg_table_name = 'products' and (
      length(btrim(coalesce(row_data->>'name_en', ''))) = 0
      or length(btrim(coalesce(row_data->>'name_te', ''))) = 0
    ) then
      raise exception using errcode = '23514', message = 'Published product names cannot be blank.';
    end if;

    if tg_table_name = 'faqs' and (
      length(btrim(coalesce(row_data->>'question_en', ''))) = 0
      or length(btrim(coalesce(row_data->>'question_te', ''))) = 0
      or length(btrim(coalesce(row_data->>'answer_en', ''))) = 0
      or length(btrim(coalesce(row_data->>'answer_te', ''))) = 0
    ) then
      raise exception using errcode = '23514', message = 'Published FAQ questions and answers cannot be blank.';
    end if;

    if tg_table_name = 'testimonials' then
      if not coalesce((row_data->>'customer_consent')::boolean, false)
        or row_data->>'consent_recorded_at' is null then
        raise exception using
          errcode = '23514',
          message = 'Testimonials require recorded customer consent before publication.';
      end if;
      if row_data->>'media_asset_id' is not null
        and not coalesce((row_data->>'image_consent')::boolean, false) then
        raise exception using
          errcode = '23514',
          message = 'A testimonial image requires explicit image consent.';
      end if;
    end if;

    if tg_table_name = 'seo_pages' then
      if coalesce((row_data->>'is_indexable')::boolean, false) and (
        lower(coalesce(row_data->>'canonical_path_en', '')) ~ '(localhost|127\.0\.0\.1|file:|/users/|[a-z]:\\)'
        or lower(coalesce(row_data->>'canonical_path_te', '')) ~ '(localhost|127\.0\.0\.1|file:|/users/|[a-z]:\\)'
      ) then
        raise exception using
          errcode = '23514',
          message = 'Indexable SEO canonicals cannot use local or internal paths.';
      end if;
      if row_data->>'og_image_asset_id' is not null and not exists (
        select 1
        from public.media_assets as ma
        where ma.id = (row_data->>'og_image_asset_id')::uuid
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

revoke all on function public.validate_publication() from public, anon, authenticated;

commit;
