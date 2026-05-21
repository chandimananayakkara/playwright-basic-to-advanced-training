import { test, expect } from "@playwright/test";

test.describe("File upload and window handling", () => {
  test("File upload checking", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");

    const chooseFileButton = page.locator("#file-upload");
    await chooseFileButton.setInputFiles("data/myTestData.txt");

    await page.locator("#file-submit").click();

    await expect(page.locator("#uploaded-files")).toBeVisible();
    await expect(page.locator("#uploaded-files")).not.toContainText(
      "No file selected",
    );
  });

  test("Window handling checking", async ({ context }) => {
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/windows");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.getByRole("link", { name: "Click Here" }).click(),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/\/new/);
    console.log(await newPage.title());

    await newPage.close();
  });
});
