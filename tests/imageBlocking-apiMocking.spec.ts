import { test, expect } from "@playwright/test";

test.describe("Image blocking and API mocking", () => {
  test("Image blocking testing", async ({ page }) => {
    await page.route("**/*.{png,jpg}", (route) => route.abort());

    await page.goto("https://www.wikipedia.org/");

    await expect(page).toHaveTitle(/Wikipedia/);

    const searchBar = page.locator("#searchInput");

    await searchBar.fill("yami gautam");
    await searchBar.press("Enter");

    await expect(page).toHaveURL(/\/Yami_Gautam/);
    await expect(page).toHaveTitle(/Yami Gautam/);
  });

  test("API mocking testing", async ({ page }) => {
    await page.route("*/**/api-mocking", async (route) => {
      const fakeData = [
        { name: "Chandima", id: 1 },
        { name: "Kasun", id: 2 },
      ];

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeData),
      });
    });

    await page.goto("https://demo.playwright.dev/api-mocking");

    await expect(page.getByText("Chandima")).toBeVisible();
    await expect(page.getByText("Kasun")).toBeVisible();
  });
});
