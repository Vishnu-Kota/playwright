import { test, expect } from "@playwright/test";
import { BookingPage } from "../pages/BookingPage";
import { LoginPage } from "../pages/LoginPage";
import user from "../test-data/eventhub-user.json";

test("booking test", async ({ page }) => {
  const bookingPage = new BookingPage(page);
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login(user.email, user.password);
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

  await page.goto("https://eventhub.rahulshettyacademy.com/events");
  await page
    .getByTestId("event-card")
    .first()
    .getByTestId("book-now-btn")
    .click();

  await bookingPage.fillDetailsAndConfirm(user.name, user.email, user.phone);
  await expect(page.locator(".booking-ref").first()).toBeVisible();
});
