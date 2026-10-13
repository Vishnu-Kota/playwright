import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { BookingPage } from "./pages/BookingPage";
import user from "./test-data/eventhub-user.json";

export const test = base.extend<{
  loginPage: LoginPage;
  bookingPage: BookingPage;
  loggedInPage: Page;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await use(page);
  },
  storageState: async ({}, use) => {
    await use("playwright/.auth/user.json");
  },
});

export { expect } from "@playwright/test";
