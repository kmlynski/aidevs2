import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  reporter: [["html", { open: "never" }]],
  use: {
    trace: "off",
  },
  timeout: 360000,
  expect: {
    timeout: 360000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
