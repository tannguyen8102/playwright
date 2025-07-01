import { defineConfig, devices } from '@playwright/test';
import { config } from './config';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: config.baseURL,
    browserName: 'chromium',
    viewport: { width: 1920, height: 1080 },
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',
    slowMo: 300,
  },
  timeout: 120000,
  reporter: [['html']],
});