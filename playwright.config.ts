import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on",
  },
  webServer: {
    command: "next build && next start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
