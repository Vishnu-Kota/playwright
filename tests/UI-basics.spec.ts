import { test, expect } from "@playwright/test";
import {
  button,
  checkbox,
  loginUrl,
  password,
  shopUrl,
  usernameInput,
} from "../constants/test-constants";

test("testing login", async ({ page }) => {
  await page.goto(loginUrl);

  await page.locator(usernameInput).fill("rahulshettyacademy");

  await page.locator(password).fill("Learning@830$3mK2");

  await page.locator(checkbox).click();

  await page.locator(button).click();

  await expect(page).toHaveURL(shopUrl);

  await page.pause();

  const titles = page.locator(".card-title a");

  console.log(await titles.first().textContent()); // first card
  console.log(await titles.nth(1).textContent()); // second card
  const all = await titles.allTextContents(); // all four as an array
  console.log(all);
});
