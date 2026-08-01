import { expect, test } from '@playwright/test';

test('serves the Angular application shell', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Pratyusha Mangalagiri/);
  await expect(page.locator('app-root')).toBeAttached();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}
