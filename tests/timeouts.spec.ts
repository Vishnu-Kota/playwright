import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
});

test("1. assertion timeout", async ({ page }) => {
  await expect(page.locator("#nope")).toBeVisible({ timeout: 2000 });
});

test("2. action timeout", async ({ page }) => {
  await page.locator("#nope").click({ timeout: 2000 });
});
test("3. test timeout", async ({ page }) => {
  test.setTimeout(3000);
  await page.locator("#nope").click();
});
