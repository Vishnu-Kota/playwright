import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

async function loginAndGoToBooking(page: Page) {
  const email = page.getByPlaceholder("you@email.com");
  const password = page.getByLabel("Password");
  const loginBtn = page.locator("#login-btn");

  await page.goto(`${BASE_URL}/login`);
  await email.fill("test@dummy.com");
  await password.fill("Pass@1234");
  await loginBtn.click();

  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
}

// Steps 2–5, shared by both tests. tickets = 1 clicks "+" zero times, tickets = 3 clicks it twice.
async function bookFirstEventAndCheckRefund(page: Page, tickets: number) {
  // Step 2: book the first event
  await page.goto(`${BASE_URL}/events`);
  await page
    .getByTestId("event-card")
    .first()
    .getByTestId("book-now-btn")
    .click();

  const plus = page.locator('button:has-text("+")');
  for (let i = 1; i < tickets; i++) {
    await plus.click();
  }
  await expect(page.locator("#ticket-count")).toHaveText(String(tickets));

  await page.getByLabel("Full Name").fill("my name");
  await page.locator("#customer-email").fill("test@dummy.com");
  await page.getByPlaceholder("+91 98765 43210").fill("98757867667");
  await page.locator(".confirm-booking-btn").click();

  // Step 3: booking detail
  await page.getByRole("link", { name: "View My Bookings" }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole("button", { name: "View Details" }).first().click();
  await expect(page.getByText("Booking Information")).toBeVisible();

  // Step 4: the ref (e.g. D-UFJ505) starts with the event title's first letter
  const bookingRef = (
    await page
      .getByText(/^[A-Z]-[A-Z0-9]+$/)
      .first()
      .innerText()
  ).trim();
  const eventTitle = (await page.locator("h1").innerText()).trim();
  console.log(bookingRef, eventTitle);
  expect(bookingRef[0]).toBe(eventTitle[0]);

  // Step 5: the page says "Check eligibility for refund?", not the brief's wording
  await page
    .getByRole("button", { name: "Check eligibility for refund" })
    .click();

  const spinner = page.locator("#refund-spinner");
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });
}

test("single ticket booking is eligible for refund", async ({ page }) => {
  await loginAndGoToBooking(page);
  await bookFirstEventAndCheckRefund(page, 1);

  // Step 6
  const result = page.locator("#refund-result");
  await expect(result).toBeVisible();
  await expect(result).toContainText("Eligible for refund");
  await expect(result).toContainText(
    "Single-ticket bookings qualify for a full refund",
  );
});

test("group ticket booking is NOT eligible for refund", async ({ page }) => {
  await loginAndGoToBooking(page);
  await bookFirstEventAndCheckRefund(page, 3);

  // Step 6
  const result = page.locator("#refund-result");
  await expect(result).toBeVisible();
  await expect(result).toContainText("Not eligible for refund");
  await expect(result).toContainText(
    "Group bookings (3 tickets) are non-refundable",
  );
});
