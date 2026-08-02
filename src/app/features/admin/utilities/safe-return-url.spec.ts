import { safeAdminReturnUrl } from './safe-return-url';

describe('safeAdminReturnUrl', () => {
  it('preserves an internal admin URL', () => {
    expect(safeAdminReturnUrl('/admin/dashboard?section=review')).toBe(
      '/admin/dashboard?section=review',
    );
  });

  it.each([
    'https://malicious.example/admin',
    '//malicious.example/admin',
    '/admin\\dashboard',
    '/admin/login?returnUrl=/admin/dashboard',
    '/public-page',
    null,
  ])('rejects external, malformed, login-loop, or non-admin return URL %s', (candidate) => {
    expect(safeAdminReturnUrl(candidate)).toBe('/admin/dashboard');
  });
});
