import { test, expect } from "../fixtures/fixtures";
import { makeEvent } from "../test-data/factories";

let eventId: number | undefined;

test.afterEach(async ({ api }) => {
  if (eventId) {
    await api.delete(`events/${eventId}`);

    eventId = undefined;
  }
});

test("event created through the api shows on the events page", async ({
  api,
  eventsPage,
}) => {
  const event = makeEvent();
  const response = await api.post("events", { data: event });
  expect(response.status()).toBe(201);
  const body = await response.json();
  eventId = body.data.id;

  await eventsPage.goTo();
  await expect(eventsPage.cardFor(event.title)).toBeVisible();
  expect(await eventsPage.getSeats(event.title)).toBe(event.totalSeats);
});
