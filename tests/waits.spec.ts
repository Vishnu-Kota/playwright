import { test, expect } from "@playwright/test";
import {
  button,
  checkbox,
  loginUrl,
  password,
  shopUrl,
  usernameInput,
} from "../constants/test-constants";

test("flaky: titles without any wait", async ({ page }) => {
  await page.goto(loginUrl);

  await page.locator(usernameInput).fill("rahulshettyacademy");
  await page.locator(password).fill("Learning@830$3mK2");
  await page.locator(checkbox).click();

  await page.locator(button).click();

  const titles = page.locator(".card-title a");
  await expect(titles).toHaveCount(4);
  // await titles.first().waitFor();
  const all = await titles.allTextContents();
  console.log(all);
  expect(all.length).toBe(4);
});

test("login form fields behave", async ({ page }) => {
  await page.goto(loginUrl);

  await expect(page.locator(usernameInput)).toBeVisible();
  await page.locator(usernameInput).fill("rahulshettyacademy");
  await expect(page.locator(usernameInput)).toHaveValue("rahulshettyacademy");

  await expect(page.locator(password)).toBeVisible();
  await page.locator(password).fill("Learning@830$3mK2");
  await expect(page.locator(password)).toHaveAttribute("type", "password");

  await expect(page.locator(checkbox)).toBeVisible();
  await page.locator(checkbox).click();
  await expect(page.locator(checkbox)).toBeChecked();
});
