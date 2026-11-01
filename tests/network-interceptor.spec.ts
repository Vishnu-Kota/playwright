import { test, expect } from "../fixtures";

test("events page shows an error when the events API fails", async ({
  page,
  eventsPage,
}) => {
  await page.route("**/api/events*", (route) =>
    route.fulfill({
      status: 500,
      body: "Server Error",
    }),
  );

  await eventsPage.goTo();
  await expect(page.getByText("Couldn't load events")).toBeVisible();
  await expect(eventsPage.card).toHaveCount(0);
});

test("events page shows a loading state when the api is slow", async ({
  page,
  eventsPage,
}) => {
  await page.route("**/api/events*", async (route) => {
    await new Promise((r) => setTimeout(r, 3000));
    await route.continue();
  });

  await eventsPage.goTo();
  await expect(eventsPage.card.first()).toBeVisible();
});
