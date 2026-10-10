import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

async function login(page: Page) {
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

function futureDateValue(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 16);
}

test("create event, book it, seat count drops by 1", async ({ page }) => {
  const eventTitle = `Test Event ${Date.now()}`;

  const titleField = page.locator("#event-title-input");

  const description = page.locator("#admin-event-form textarea");
  const city = page.getByPlaceholder("e.g. Bangalore");
  const venue = page.getByPlaceholder("Venue name & address");
  const eventDate = page.getByLabel("Event Date & Time");
  const price = page.getByPlaceholder("0.00");
  const totalSeats = page.getByPlaceholder("e.g. 500");
  const addEventBtn = page.locator("#add-event-btn");

  await login(page);

  await page.goto(`${BASE_URL}/admin/events`);
  await expect(page).toHaveURL(`${BASE_URL}/admin/events`);

  await titleField.fill(eventTitle);
  await description.fill("Event created by a Playwright test");
  await city.fill("Bangalore");
  await venue.fill("Test Venue, MG Road");
  await eventDate.fill(futureDateValue());
  await price.fill("100");
  await totalSeats.fill("50");
  await addEventBtn.click();

  await expect(page.getByText("Event created!")).toBeVisible();

  await page.goto(`${BASE_URL}/events`);
  await expect(page).toHaveURL(`${BASE_URL}/events`);
  const cards = page.getByTestId("event-card");
  await expect(cards.first()).toBeVisible();

  const myCards = cards.filter({ hasText: eventTitle });
  await expect(myCards).toBeVisible({ timeout: 5000 });

  const seatsText = await myCards.getByText("seat").innerText();
  const seatsBeforeBooking = parseInt(seatsText);
  console.log(seatsText, "→", seatsBeforeBooking);

  await myCards.getByTestId("book-now-btn").click();
  await expect(page).toHaveURL(/\/events\/\d+/);

  await expect(page.locator("#ticket-count")).toHaveText("1");
  await page.getByLabel("Full Name").fill("my name");
  await page.locator("#customer-email").fill("test@dummy.com");
  await page.getByPlaceholder("+91 98765 43210").fill("98757867667");
  await page.locator(".confirm-booking-btn").click();

  const bookingRefEl = page.locator(".booking-ref").first();
  await expect(bookingRefEl).toBeVisible();

  const bookingRef = (await bookingRefEl.innerText()).trim();
  console.log("Booking ref:", bookingRef);
  await page.getByRole("link", { name: "View My Bookings" }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  const bookingCards = page.locator("#booking-card");
  await expect(bookingCards.first()).toBeVisible();
  const myBooking = bookingCards.filter({
    has: page.locator(".booking-ref", { hasText: bookingRef }),
  });
  await expect(myBooking).toBeVisible();
  await expect(myBooking).toContainText(eventTitle);

  await page.goto(`${BASE_URL}/events`);
  await expect(cards.first()).toBeVisible();
  await expect(myCards).toBeVisible();

  const seatsAfterText = await myCards.getByText("seat").innerText();
  const seatsAfterBooking = parseInt(seatsAfterText);
  console.log(seatsAfterText, "→", seatsAfterBooking);

  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});
