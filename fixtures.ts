import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { BookingPage } from "./pages/BookingPage";
import { EventsPage } from "./pages/EventsPage";
import { AdminEventsPage } from "./pages/AdminEventsPage";
import user from "./test-data/eventhub-user.json";

export const test = base.extend<
  {
    loginPage: LoginPage;
    bookingPage: BookingPage;
    loggedInPage: Page;
    eventsPage: EventsPage;
    adminEventsPage: AdminEventsPage;
  },
  { workerLog: string }
>({
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },
  bookingPage: async ({ page }: { page: Page }, use) => {
    await use(new BookingPage(page));
  },
  loggedInPage: async ({ page }: { page: Page }, use) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await use(page);
  },
  eventsPage: async ({ page }: { page: Page }, use) => {
    await use(new EventsPage(page));
  },
  adminEventsPage: async ({ page }: { page: Page }, use) => {
    await use(new AdminEventsPage(page));
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
