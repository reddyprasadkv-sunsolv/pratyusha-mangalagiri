import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const workspace = process.cwd();
const migrationsDirectory = join(workspace, 'supabase', 'migrations');
const migrations = readdirSync(migrationsDirectory)
  .filter((file) => file.endsWith('.sql'))
  .map((file) => readFileSync(join(migrationsDirectory, file), 'utf8'))
  .join('\n')
  .toLowerCase();

const applicationTables = [
  'admin_profiles',
  'media_assets',
  'site_settings',
  'page_sections',
  'products',
  'ritual_items',
  'faqs',
  'founder_profiles',
  'testimonials',
  'contact_settings',
  'seo_pages',
  'legal_pages',
  'leads',
  'email_delivery_logs',
  'audit_logs',
] as const;

describe('Supabase migration security contract', () => {
  it('enables RLS on every application table', () => {
    applicationTables.forEach((table) =>
      expect(migrations).toContain(`alter table public.${table} enable row level security`),
    );
  });

  it('uses fixed search paths and restricts security helper execution', () => {
    expect(migrations).toContain('set search_path = public, pg_temp');
    expect(migrations).toContain(
      'revoke all on function public.current_admin_role() from public, anon',
    );
    expect(migrations).toContain(
      'grant execute on function public.current_admin_role() to authenticated',
    );
    expect(migrations).toContain(
      'revoke all on function public.current_admin_profile() from public, anon',
    );
    expect(migrations).toContain(
      'grant execute on function public.current_admin_profile() to authenticated',
    );
  });

  it('has no anonymous CMS, storage, or lead write policy', () => {
    expect(migrations).not.toMatch(/on public\.leads for insert to anon/);
    expect(migrations).not.toMatch(/on public\.[a-z_]+ for (insert|update|delete) to anon/);
    expect(migrations).not.toMatch(/on storage\.objects for insert to anon/);
  });

  it('restricts media formats and excludes PDF uploads', () => {
    expect(migrations).toContain("array['image/jpeg', 'image/png', 'image/webp', 'image/avif']");
    expect(migrations).not.toContain("'application/pdf'");
  });

  it('contains no broad authenticated-only administrator shortcut', () => {
    expect(migrations).not.toContain("auth.role() = 'authenticated'");
    expect(migrations).toContain('public.is_editor_or_owner()');
    expect(migrations).toContain('public.is_owner()');
  });

  it('preserves CMS history by denying hard deletes from application roles', () => {
    const historicalTables = applicationTables.filter(
      (table) => !['admin_profiles', 'leads', 'email_delivery_logs', 'audit_logs'].includes(table),
    );

    historicalTables.forEach((table) =>
      expect(migrations).not.toMatch(new RegExp(`on public\\.${table} for delete`)),
    );
    expect(migrations).not.toMatch(
      /grant [^;]*delete[^;]* on public\.(media_assets|site_settings)/,
    );
  });
});

describe('Angular integration boundaries', () => {
  const productionFiles = collectFiles(join(workspace, 'src', 'app')).filter(
    (file) => file.endsWith('.ts') && !file.endsWith('.spec.ts'),
  );

  it('does not reference a service-role environment variable in Angular', () => {
    const forbiddenName = 'SUPABASE_' + 'SERVICE_ROLE_KEY';
    const source = productionFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

    expect(source).not.toContain(forbiddenName);
  });

  it('keeps public presentation components independent of Supabase imports', () => {
    const publicSiteFiles = productionFiles.filter((file) => file.includes('/public-site/'));
    const source = publicSiteFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

    expect(source).not.toContain('@supabase/');
    expect(source).not.toContain('core/supabase');
  });

  it('does not add direct lead insertion, PDF, or appointment functionality', () => {
    const source = productionFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

    expect(source).not.toMatch(/from\(['"]leads['"]\)\.insert/);
    expect(source).not.toContain('appointment-booking');
    expect(source).not.toContain('pdf download');
  });
});

function collectFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}
