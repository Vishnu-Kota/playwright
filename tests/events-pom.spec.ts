import { test, expect } from "../fixtures/fixtures";
import { user } from "../test-data/user";

let eventId: number | undefined;

test.afterEach(async ({ authRequest }) => {
  if (eventId) {
    const res = await authRequest.delete(`events/${eventId}`);
    expect(res.ok()).toBeTruthy();
    eventId = undefined;
  }
});

test("create event, book it, seat count drops by 1", async ({
  loggedInPage,
  eventsPage,
  bookingPage,
  authRequest,
}) => {
  const title = `Test Event ${Date.now()}`;

  const event = {
    title,
    category: "Conference",
    venue: "Test Venue",
    city: "Bangalore",
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    price: 100,
    totalSeats: 50,
  };
  const response = await authRequest.post("events", { data: event });
  expect(response.status()).toBe(201);
  const body = await response.json();
  eventId = body.data.id;

  await eventsPage.goTo();
  const before = await eventsPage.getSeats(title);

  await eventsPage.bookNow(title);
  await bookingPage.fillDetailsAndConfirm(user.name, user.email, user.phone);
  await expect(loggedInPage.locator(".booking-ref").first()).toBeVisible();

  await eventsPage.goTo();
  const after = await eventsPage.getSeats(title);

  expect(after).toBe(before - 1);
});
