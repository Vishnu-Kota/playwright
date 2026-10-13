import { test, expect } from "../fixtures";
import user from "../test-data/eventhub-user.json";

test("booking test", async ({ page, bookingPage, loginPage }) => {
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
