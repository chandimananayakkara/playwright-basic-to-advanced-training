import { test, expect } from "@playwright/test";

test("My first test - Check Page title", async ({ page }) => {
  await page.goto("https://www.playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
});

