import { test, expect } from "../fixtures";

let eventId: number | undefined;

test.afterEach(async ({ authRequest }) => {
  if (eventId) {
    await authRequest.delete(`events/${eventId}`);

    eventId = undefined;
  }
});

test("event created through the api shows on the events page", async ({
  authRequest,
  eventsPage,
}) => {
  const title = `API seeding ${Date.now()}`;
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
  await expect(eventsPage.cardFor(title)).toBeVisible();
  expect(await eventsPage.getSeats(title)).toBe(event.totalSeats);
});
