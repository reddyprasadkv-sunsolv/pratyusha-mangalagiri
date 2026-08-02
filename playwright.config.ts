import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env['CI']),
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run serve:ssr',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: false,
    env: {
      PUBLIC_SITE_URL: 'http://127.0.0.1:4200',
      PUBLIC_INDEXING_ENABLED: 'true',
      NG_ALLOWED_HOSTS: '127.0.0.1,localhost',
      PORT: '4200',
    },
  },
});
