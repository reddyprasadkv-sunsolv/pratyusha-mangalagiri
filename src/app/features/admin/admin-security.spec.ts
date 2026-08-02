import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const workspace = process.cwd();
const adminRoot = join(workspace, 'src', 'app', 'features', 'admin');
const productionAdminFiles = collectFiles(adminRoot).filter(
  (file) => !file.endsWith('.spec.ts') && !file.endsWith('.scss'),
);
const adminSource = productionAdminFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

describe('administrator frontend security contract', () => {
  it('keeps Supabase queries out of admin presentation components', () => {
    const componentFiles = productionAdminFiles.filter(
      (file) => file.endsWith('.ts') && (file.includes('/components/') || file.includes('/pages/')),
    );
    const source = componentFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

    expect(source).not.toContain('@supabase/supabase-js');
    expect(source).not.toMatch(/\.from\(['"][a-z_]+['"]\)/);
    expect(source).not.toMatch(/\.rpc\(['"][a-z_]+['"]\)/);
  });

  it('contains no signup, service-role, hardcoded credential, or guard bypass', () => {
    expect(adminSource).not.toContain('signUp(');
    expect(adminSource).not.toContain('SUPABASE_' + 'SERVICE_ROLE_KEY');
    expect(adminSource).not.toContain('bypassAdmin');
    expect(adminSource).not.toContain('mockOwner');
    expect(adminSource).not.toMatch(/password\s*[:=]\s*['"][^'"]+['"]/i);
    expect(adminSource).not.toMatch(/isAdmin\s*=\s*true/);
  });

  it('never stores auth tokens in TransferState, templates, or logs', () => {
    expect(adminSource).not.toContain('TransferState');
    expect(adminSource).not.toContain('refresh_token');
    expect(adminSource).not.toContain('access_token');
    expect(adminSource).not.toMatch(/console\.(log|warn|error)\([^)]*(session|token|password)/i);
  });

  it('marks admin routes client-rendered and excludes them from the sitemap', () => {
    const serverRoutes = readFileSync(
      join(workspace, 'src', 'app', 'app.routes.server.ts'),
      'utf8',
    );
    const seoStatic = readFileSync(
      join(workspace, 'src', 'app', 'core', 'seo', 'seo-static.ts'),
      'utf8',
    );

    expect(serverRoutes).toContain("path: 'admin/**'");
    expect(serverRoutes).toContain('renderMode: RenderMode.Client');
    expect(serverRoutes).toContain("'X-Robots-Tag': 'noindex, nofollow'");
    expect(seoStatic).not.toMatch(/INDEXABLE_PUBLIC_ROUTES\s*=\s*\[[^\]]*admin/s);
  });

  it('does not add PDF, appointment, payment, email, or public lead submission', () => {
    expect(adminSource).not.toContain('application/pdf');
    expect(adminSource).not.toContain('appointment-booking');
    expect(adminSource).not.toContain('payment integration');
    expect(adminSource).not.toContain('resend.com');
    expect(adminSource).not.toMatch(/from\(['"]leads['"]\)\.insert/);
  });
});

function collectFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}
