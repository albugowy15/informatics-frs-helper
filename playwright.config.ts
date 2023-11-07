import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 15 * 1000,
  use: {
    baseURL: "http://localhost:3000",
    trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
  },
  webServer: {
    command: "yarn start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
