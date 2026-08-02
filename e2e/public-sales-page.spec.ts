import { expect, test } from '@playwright/test';

const englishTitle = 'Crystal Bracelets with 21-Day Guidance | Pratyusha';
const teluguTitle = '21-Day మార్గదర్శనంతో క్రిస్టల్ బ్రేస్‌లెట్లు | Pratyusha';
const siteUrl = 'http://127.0.0.1:4200';

const futureProducts = [
  "Tiger's Eye Bracelet",
  'Pyrite Clusters',
  'Amethyst Bracelet',
  'Rose Quartz Bracelet',
  'Orthoceras Pendant',
];

test('renders the English homepage and four approved products by default', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Transform Your Energy');
  await expect(page.getByRole('button', { name: 'English selected' })).toBeVisible();
  await expect(page.locator('[data-product-id]')).toHaveCount(4);
});

test('returns complete English SEO in the server-rendered response', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain(`<html lang="en"`);
  expect(html).toContain(`<title>${englishTitle}</title>`);
  expect(html).toContain('name="description"');
  expect(html).toContain(`rel="canonical" href="${siteUrl}/"`);
  expect(html).toContain('hreflang="en"');
  expect(html).toContain('hreflang="te"');
  expect(html).toContain('hreflang="x-default"');
  expect(html).toContain('property="og:locale" content="en_IN"');
  expect(html).toContain('name="twitter:card" content="summary_large_image"');
  expect(html).toContain('type="application/ld+json"');
  expect(html).toContain('<h1');
  expect(html.toLowerCase()).not.toContain('client input required');
});

test('renders Telugu content and Telugu product alt text', async ({ page }) => {
  await page.goto('/te');

  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('మీ ఎనర్జీని మార్చుకోండి');
  await expect(
    page.getByAltText('చేతిలో చూపించిన వివిధ రంగుల క్రిస్టల్ సక్సెస్ బ్రేస్‌లెట్').first(),
  ).toBeVisible();
});

test('returns complete Telugu SEO on direct SSR navigation', async ({ request }) => {
  const response = await request.get('/te');
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain(`<html lang="te"`);
  expect(html).toContain(`<title>${teluguTitle}</title>`);
  expect(html).toContain('name="description"');
  expect(html).toContain(`rel="canonical" href="${siteUrl}/te"`);
  expect(html).toContain('property="og:locale" content="te_IN"');
  expect(html).toContain('property="og:locale:alternate" content="en_IN"');
  expect(html).toContain('type="application/ld+json"');
  expect(html).toContain('<h1');
});

test('switches languages both ways and persists the selection after refresh', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch website language to Telugu' }).click();

  await expect(page).toHaveURL(/\/te$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  expect(await page.evaluate(() => localStorage.getItem('site_language'))).toBe('te');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'te');

  await page.getByRole('button', { name: 'వెబ్‌సైట్ భాషను ఆంగ్లంలోకి మార్చండి' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('does not duplicate metadata after repeated client-side language navigation', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch website language to Telugu' }).click();
  await page.getByRole('button', { name: 'వెబ్‌సైట్ భాషను ఆంగ్లంలోకి మార్చండి' }).click();
  await page.getByRole('button', { name: 'Switch website language to Telugu' }).click();

  await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('head link[rel="alternate"][hreflang]')).toHaveCount(3);
  await expect(page.locator('head meta[name="description"]')).toHaveCount(1);
  await expect(page).toHaveTitle(teluguTitle);
});

test('hydrates without visible errors or console hydration warnings', async ({ page }) => {
  const consoleWarnings: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'warning' || message.type() === 'error') {
      consoleWarnings.push(message.text());
    }
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('/te');
  await page.getByRole('heading', { level: 1 }).waitFor();

  expect(pageErrors).toEqual([]);
  expect(consoleWarnings.filter((message) => /hydration|NG05\d{2}/i.test(message))).toEqual([]);
  await expect(page.locator('body')).not.toContainText('Application error');
});

test('retains enquiry form values and consent while switching language', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Full Name').fill('Pratyusha');
  await page.getByLabel('Mobile Number').fill('9876543210');
  await page.getByLabel('Requirement').selectOption('success');
  await page.getByLabel(/I agree that my details/).check();

  await page.getByRole('button', { name: 'Switch website language to Telugu' }).click();

  await expect(page.getByLabel('పూర్తి పేరు')).toHaveValue('Pratyusha');
  await expect(page.getByLabel('మొబైల్ నంబర్')).toHaveValue('9876543210');
  await expect(page.getByLabel('మీ అవసరం')).toHaveValue('success');
  await expect(page.getByLabel(/నా వివరాలను/)).toBeChecked();
});

test('opens and closes the accessible mobile menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open menu' });

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('loads all approved product images without using Pyrite Clusters', async ({ page }) => {
  await page.goto('/');
  await page.locator('#collection').scrollIntoViewIfNeeded();

  const productImages = page.locator('.product-card img');
  await expect(productImages).toHaveCount(4);
  for (const image of await productImages.all()) {
    await expect(image).toHaveJSProperty('complete', true);
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
  }

  const sources = await productImages.evaluateAll((images) =>
    images.map((image) => (image as HTMLImageElement).currentSrc),
  );
  expect(sources.some((source) => source.includes('pyrite-bracelet'))).toBe(true);
  expect(sources.every((source) => !source.includes('clusters'))).toBe(true);
});

test('product-card enquiry links navigate to the form', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-product-link="success"]').click();

  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('heading', { name: 'Your enquiry' })).toBeVisible();
});

test('exposes an accessible FAQ accordion', async ({ page }) => {
  await page.goto('/');
  const question = page.getByRole('button', { name: 'What happens during the 21-Day Ritual?' });

  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  const panelId = await question.getAttribute('aria-controls');
  await expect(page.locator(`#${panelId}`)).toBeVisible();
});

test('hides internal markers, testimonials, credentials, and future products', async ({ page }) => {
  await page.goto('/');
  const body = page.locator('body');

  await expect(body).not.toContainText('[CLIENT INPUT REQUIRED');
  await expect(body).not.toContainText('Customer Experiences');
  await expect(body).not.toContainText('Crystal Healer');
  for (const product of futureProducts) {
    await expect(body).not.toContainText(product);
  }
});

test('uses claim-neutral image presentation and renders the wellness disclaimer', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.locator('.product-card__media h1, .product-card__media h2, .product-card__media h3'),
  ).toHaveCount(0);
  await expect(page.locator('.product-card__media [data-benefit-icon]')).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'A Note About Crystal and Wellness Practices' }),
  ).toBeVisible();
});

test('returns accessible noindex 404 pages without exposing draft legal links', async ({
  page,
}) => {
  const response = await page.goto('/privacy-policy');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not here');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('footer a[href*="privacy-policy"]')).toHaveCount(0);

  const teluguResponse = await page.goto('/te/missing-page');
  expect(teluguResponse?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ఇక్కడ లేదు');
});

test('serves a constrained bilingual sitemap and production-safe robots policy', async ({
  request,
}) => {
  const sitemapResponse = await request.get('/sitemap.xml');
  const sitemap = await sitemapResponse.text();
  expect(sitemapResponse.status()).toBe(200);
  expect(sitemapResponse.headers()['content-type']).toContain('application/xml');
  expect(sitemap.match(/<url>/g)).toHaveLength(2);
  expect(sitemap).toContain(`<loc>${siteUrl}/</loc>`);
  expect(sitemap).toContain(`<loc>${siteUrl}/te</loc>`);
  expect(sitemap).not.toContain('privacy-policy');
  expect(sitemap).not.toContain('/admin');

  const robotsResponse = await request.get('/robots.txt');
  const robots = await robotsResponse.text();
  expect(robotsResponse.status()).toBe(200);
  expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
  expect(robots).not.toContain('Disallow: /te');
});

test('does not expose appointment, payment, backend, or PDF functionality', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-feature="appointment-booking"]')).toHaveCount(0);
  await expect(page.locator('a[href$=".pdf"], a[download]')).toHaveCount(0);
  await expect(page.locator('[data-feature="payment"]')).toHaveCount(0);
  await expect(page.locator('form[action], form[method]')).toHaveCount(0);
});

for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
  test(`has no horizontal overflow and keeps Telugu product media clear at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/te');
    await page.locator('#collection').scrollIntoViewIfNeeded();

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('[data-product-id]')).toHaveCount(4);
    await expect(page.locator('.product-card img').first()).toBeVisible();
  });
}
