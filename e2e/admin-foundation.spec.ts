import { expect, test } from '@playwright/test';

test('renders a safe disabled administration login without backend requests', async ({ page }) => {
  const backendRequests: string[] = [];
  page.on('request', (request) => {
    if (/supabase|\.supabase\.co/i.test(request.url())) {
      backendRequests.push(request.url());
    }
  });

  await page.goto('/admin/login');

  await expect(page.getByRole('heading', { level: 1, name: 'Administration Login' })).toBeVisible();
  await expect(
    page.getByText('Administration is not available until the approved Supabase'),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeDisabled();
  await expect(page.getByLabel('Email address')).toBeDisabled();
  await expect(page.locator('#admin-password')).toBeDisabled();
  await expect(page.getByText(/create account/i)).toHaveCount(0);
  expect(backendRequests).toEqual([]);
});

test('exposes accessible login constraints and password visibility control', async ({ page }) => {
  await page.goto('/admin/login');

  const email = page.getByLabel('Email address');
  const password = page.locator('#admin-password');
  const toggle = page.getByRole('button', { name: 'Show password' });
  await expect(email).toHaveAttribute('type', 'email');
  await expect(email).toHaveAttribute('required', '');
  await expect(email).toHaveAttribute('maxlength', '254');
  await expect(password).toHaveAttribute('type', 'password');
  await expect(password).toHaveAttribute('required', '');
  await expect(password).toHaveAttribute('maxlength', '256');
  await expect(toggle).toHaveAttribute('type', 'button');
  await expect(toggle).toBeDisabled();
});

test('protects direct administration URLs while signed out', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login\?returnUrl=%2Fadmin%2Fdashboard$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Administration Login');

  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/admin\/login\?returnUrl=%2Fadmin%2Fdashboard$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Administration Login');
});

test('sets noindex metadata and response headers without public SEO leakage', async ({ page }) => {
  const response = await page.goto('/admin/login');

  expect(response?.headers()['x-robots-tag']).toBe('noindex, nofollow');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property^="og:"]')).toHaveCount(0);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
});

test('keeps admin URLs out of public navigation and sitemap', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('a[href^="/admin"]')).toHaveCount(0);

  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).not.toContain('/admin');
  expect(sitemap.match(/<url>/g)).toHaveLength(2);
});

test('restores public indexable metadata after visiting administration', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');

  await page.goto('/te');
  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'http://127.0.0.1:4200/te',
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});

test('supports keyboard entry and an accessible backend status', async ({ page }) => {
  await page.goto('/admin/login');
  await page.keyboard.press('Tab');

  await expect(page.getByRole('link', { name: 'Skip to administration login' })).toBeFocused();
  await expect(page.getByRole('status').filter({ hasText: 'Not configured' })).toBeVisible();
});

for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
  test(`admin login has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/admin/login');
    await page.getByRole('heading', { level: 1 }).waitFor();

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
  });
}

test('produces no administration console errors or public hydration warnings', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  await page.goto('/admin/login');
  await page.getByRole('heading', { level: 1 }).waitFor();
  await page.goto('/');
  await page.getByRole('heading', { level: 1 }).waitFor();

  expect(errors.filter((message) => !/favicon/i.test(message))).toEqual([]);
});
