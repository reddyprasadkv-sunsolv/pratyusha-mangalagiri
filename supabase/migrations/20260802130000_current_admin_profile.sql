begin;

create or replace function public.current_admin_profile()
returns table (
  user_id uuid,
  display_name text,
  role public.administrator_role,
  is_active boolean
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select ap.user_id, ap.display_name, ap.role, ap.is_active
  from public.admin_profiles as ap
  where ap.user_id = (select auth.uid())
    and ap.is_active
  limit 1
$$;

revoke all on function public.current_admin_profile() from public, anon;
grant execute on function public.current_admin_profile() to authenticated;

commit;
