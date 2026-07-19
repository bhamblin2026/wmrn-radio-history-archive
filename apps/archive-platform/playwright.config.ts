import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry"
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 15"] } }
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: true,
    timeout: 120000
  }
});
