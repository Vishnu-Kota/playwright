import { expect, Page } from "@playwright/test";
import { test as base } from "./api-fixtures";
import { LoginPage } from "../pages/LoginPage";
import { BookingPage } from "../pages/BookingPage";
import { EventsPage } from "../pages/EventsPage";
import { AdminEventsPage } from "../pages/AdminEventsPage";
import { makeEvent } from "../test-data/factories";

export const test = base.extend<
  {
    loginPage: LoginPage;
    bookingPage: BookingPage;
    authedPage: Page;
    eventsPage: EventsPage;
    adminEventsPage: AdminEventsPage;
    event: { id: number; title: string; totalSeats: number };
  },
  { workerLog: string }
>({
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },
  bookingPage: async ({ page }: { page: Page }, use) => {
    await use(new BookingPage(page));
  },
  authedPage: async ({ page }: { page: Page }, use) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await use(page);
  },
  eventsPage: async ({ page }: { page: Page }, use) => {
    await use(new EventsPage(page));
  },
  adminEventsPage: async ({ page }: { page: Page }, use) => {
    await use(new AdminEventsPage(page));
  },

  event: async ({ api }, use) => {
    const newEvent = makeEvent();

    const response = await api.post("events", { data: newEvent });
    expect(response.status()).toBe(201);
    const body = await response.json();

    const id = body.data.id;
    await use({ id, title: newEvent.title, totalSeats: newEvent.totalSeats });

    const res = await api.delete(`events/${id}`);
    expect(res.ok()).toBeTruthy();
  },
  storageState: async ({}, use) => {
    await use("playwright/.auth/user.json");
  },
  workerLog: [
    async ({}, use) => {
      console.log("worker fixture: setup");
      await use("hello");
      console.log("worker fixture: teardown");
    },
    { scope: "worker" },
  ],
});

export { expect } from "@playwright/test";
