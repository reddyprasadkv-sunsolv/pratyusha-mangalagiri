begin;

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
  if tg_table_name = 'site_settings' then
    if new.is_published then
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

revoke all on function public.validate_publication() from public, anon, authenticated;

commit;
