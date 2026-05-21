import { test, expect } from "@playwright/test";

test("Login Page testing with valid credentials", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/login");

  await expect(page).toHaveTitle(/Login Page/);

  const usernameField = page.getByLabel("Username");
  const passwordField = page.getByLabel("Password");
  const loginButton = page.getByRole("button", { name: "Login" });

  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(loginButton).toBeVisible();

  await usernameField.clear();
  await passwordField.clear();

  await usernameField.fill("practice");
  await passwordField.fill("SuperSecretPassword!");
  await loginButton.click();

  await expect(page.getByText("You logged into a secure area!")).toBeVisible();
  await expect(page).toHaveURL(/\/secure/);
});

test("Login Page testing with invalid credentials", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/login");

  await expect(page).toHaveTitle(/Login Page/);

  const usernameField = page.getByLabel("Username");
  const passwordField = page.getByLabel("Password");
  const loginButton = page.getByRole("button", { name: "Login" });

  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(loginButton).toBeVisible();

  await usernameField.clear();
  await passwordField.clear();

  await usernameField.fill("practice");
  await passwordField.fill("wrongPassword");
  await loginButton.click();

  await expect(page.getByText("Your password is invalid!")).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});
