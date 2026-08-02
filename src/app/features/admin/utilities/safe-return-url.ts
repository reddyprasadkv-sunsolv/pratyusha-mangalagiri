const ADMIN_PATH = /^\/admin(?:\/|$)/;

export function safeAdminReturnUrl(candidate: string | null | undefined): string {
  if (!candidate || !ADMIN_PATH.test(candidate)) {
    return '/admin/dashboard';
  }

  if (
    candidate.startsWith('//') ||
    candidate.includes('\\') ||
    candidate.includes('://') ||
    candidate.startsWith('/admin/login')
  ) {
    return '/admin/dashboard';
  }

  return candidate;
}
