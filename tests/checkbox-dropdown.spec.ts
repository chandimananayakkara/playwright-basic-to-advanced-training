import { test, expect } from "@playwright/test";

test.describe("UI Element Suite", () => {
  test("Drop Down Testing", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");

    const dropdown = page.locator("select#dropdown");
    await dropdown.selectOption("2");
    await expect(dropdown).toContainText("Option 2");
  });

  test("Checkbox testing", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    const checkbox1 = page.getByRole("checkbox").nth(0);
    const checkbox2 = page.getByRole("checkbox").nth(1);

    await checkbox1.check();
    await checkbox2.uncheck();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });
});
