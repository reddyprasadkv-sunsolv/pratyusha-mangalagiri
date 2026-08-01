import { expect, test } from '@playwright/test';

test('renders the English homepage by default', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Give your idea');
  await expect(page.getByRole('button', { name: 'English selected' })).toBeVisible();
});

test('renders the Telugu homepage route and can switch back to English', async ({ page }) => {
  await page.goto('/te');

  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('మీ ఆలోచనకు');
  await page.getByRole('button', { name: 'వెబ్‌సైట్ భాషను ఆంగ్లంలోకి మార్చండి' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('switches to Telugu and restores the persisted language after refresh', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch website language to Telugu' }).click();

  await expect(page).toHaveURL(/\/te$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  expect(await page.evaluate(() => localStorage.getItem('site_language'))).toBe('te');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('మీ ఆలోచనకు');
});

test('retains enquiry form values and consent while switching language', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Full Name').fill('Pratyusha');
  await page.getByLabel('Mobile Number').fill('9876543210');
  await page.getByLabel('Requirement').selectOption('brand');
  await page.getByLabel(/I agree that my details/).check();

  await page.getByRole('button', { name: 'Switch website language to Telugu' }).click();

  await expect(page.getByLabel('పూర్తి పేరు')).toHaveValue('Pratyusha');
  await expect(page.getByLabel('మొబైల్ నంబర్')).toHaveValue('9876543210');
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

test('exposes an accessible FAQ accordion', async ({ page }) => {
  await page.goto('/');
  const question = page.getByRole('button', { name: 'Can we communicate in Telugu?' });

  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  const panelId = await question.getAttribute('aria-controls');
  await expect(page.locator(`#${panelId}`)).toBeVisible();
});

test('keeps legal links on bilingual non-broken draft routes', async ({ page }) => {
  await page.goto('/privacy-policy');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy Policy');

  await page.goto('/te/privacy-policy');
  await expect(page.locator('html')).toHaveAttribute('lang', 'te');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('గోప్యతా విధానం');
});

test('does not expose appointment, payment, or PDF functionality', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-feature="appointment-booking"]')).toHaveCount(0);
  await expect(page.locator('a[href$=".pdf"], a[download]')).toHaveCount(0);
  await expect(page.locator('[data-feature="payment"]')).toHaveCount(0);
});

for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/te');

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByAltText('సాంప్రదాయ చీరలో సంస్థ వ్యవస్థాపకురాలి వృత్తిపరమైన చిత్రం').first(),
    ).toBeVisible();
  });
}
