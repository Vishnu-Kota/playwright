import { test, expect } from "@playwright/test";

test("test webpage rahul shetty", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.getByLabel("username").fill("rahulshettyacademy");

  await page.getByLabel("password").fill("Learning@830$3mK1");

  await page.getByRole("button").click();

  await expect(page.locator(".alert-danger")).toBeVisible();
});

test("correct creds pass", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.getByLabel("username").fill("rahulshettyacademy");

  await page.getByLabel("password").fill("Learning@830$3mK2");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/angularpractice/shop",
  );
});
