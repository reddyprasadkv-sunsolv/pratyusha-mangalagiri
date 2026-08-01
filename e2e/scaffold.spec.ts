import { expect, test } from '@playwright/test';

test('serves the Angular application shell', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Pratyusha Mangalagiri');
  await expect(page.locator('app-root')).toBeAttached();
});
