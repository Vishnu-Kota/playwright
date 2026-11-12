import { test, expect } from "../fixtures/fixtures";

test("the first event from the API shows on the event page", async ({
  api,
  authedPage,
}) => {
  const response = await api.get("events");
  expect(response.status()).toBe(200);

  const body = await response.json();
  const firstTitle = body.data[0].title;

  await authedPage.goto("/events");
  await expect(authedPage.getByText(firstTitle).first()).toBeVisible();
});
