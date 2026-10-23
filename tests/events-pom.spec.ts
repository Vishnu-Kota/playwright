import { test, expect } from "../fixtures";
import { user } from "../test-data/user";

test("create event, book it, seat count drops by 1", async ({
  loggedInPage,
  adminEventsPage,
  eventsPage,
  bookingPage,
}) => {
  const title = `Test Event ${Date.now()}`;

  await adminEventsPage.goTo();
  await adminEventsPage.createEvent(title);
  await expect(loggedInPage.getByText("Event created!")).toBeVisible();

  await eventsPage.goTo();
  const before = await eventsPage.getSeats(title);

  await eventsPage.bookNow(title);
  await bookingPage.fillDetailsAndConfirm(user.name, user.email, user.phone);
  await expect(loggedInPage.locator(".booking-ref").first()).toBeVisible();

  await eventsPage.goTo();
  const after = await eventsPage.getSeats(title);

  expect(after).toBe(before - 1);
});
