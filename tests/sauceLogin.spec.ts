import { LoginPage } from "../pages/SauceLoginPage";
import { test, expect } from "@playwright/test";
import 'dotenv/config'
import process from "node:process";

const testData = [
  { username: "standard_user", expectedTitle: "Products" },
  { username: "locked_out_user", expectedTitle: "Epic sadface" },
  { username: "problem_user", expectedTitle: "Piss" },
];

for (const data of testData) {
  test(`Login testing using ${data.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.loginToApplication(data.username, process.env.SAUCE_PASSWORD!);

    // await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await expect(page.getByText(data.expectedTitle)).toBeVisible();
  });
}
