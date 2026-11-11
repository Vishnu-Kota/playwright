import { test, expect } from "../fixtures/fixtures";
import { user } from "../test-data/user";

test("book an event, seat count drops by 1", async ({
  authedPage,
  eventsPage,
  bookingPage,
  event,
}) => {
  await eventsPage.goTo();
  const before = await eventsPage.getSeats(event.title);

  await eventsPage.bookNow(event.title);
  await bookingPage.fillDetailsAndConfirm(user.name, user.email, user.phone);
  await expect(authedPage.locator(".booking-ref").first()).toBeVisible();

  await eventsPage.goTo();
  const after = await eventsPage.getSeats(event.title);

  expect(after).toBe(before - 1);
});
