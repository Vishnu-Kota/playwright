import { test, expect } from "../../fixtures/api-fixtures";

let eventId: number | undefined;

test.afterEach(async ({ api }) => {
  if (eventId) {
    await api.delete(`events/${eventId}`);
    eventId = undefined;
  }
});

test("create, read, update & delete an event", async ({ api }) => {
  const event = {
    title: `API test ${Date.now()}`,
    category: "Conference",
    venue: "Test Venue",
    city: "Bangalore",
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    price: 100,
    totalSeats: 50,
  };

  await test.step("create", async () => {
    const response = await api.post("events", { data: event });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.data.title).toBe(event.title);
    eventId = body.data.id;
  });

  await test.step("read", async () => {
    const response = await api.get(`events/${eventId}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.title).toBe(event.title);
  });

  await test.step("update", async () => {
    const newTitle = `${event.title} updated`;
    const response = await api.put(`events/${eventId}`, {
      data: { ...event, title: newTitle },
    });

    expect(response.status()).toBe(200);

    const check = await api.get(`events/${eventId}`);
    const body = await check.json();
    expect(body.data.title).toBe(newTitle);
  });

  await test.step("delete", async () => {
    const response = await api.delete(`events/${eventId}`);
    expect(response.status()).toBe(200);

    const check = await api.get(`events/${eventId}`);
    expect(check.status()).toBe(404);

    eventId = undefined;
  });
});
