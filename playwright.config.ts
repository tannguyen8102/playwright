import { defineConfig, devices } from "@playwright/test";
import { config } from "./config";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: config.baseURL,
    browserName: "chromium",
    viewport: { width: 1920, height: 1080 },
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on",
  },
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText('text')`.
     */
    timeout: 20000,
  },
  timeout: 120000,
  reporter: [["html"]],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
