import { Page, Locator } from "@playwright/test";

export class Header {
  readonly eventsLink: Locator;
  readonly bookingsLink: Locator;

  constructor(page: Page) {
    this.eventsLink = page.getByTestId("nav-events");
    this.bookingsLink = page.getByTestId("nav-bookings");
  }

  async goToEventsLink() {
    await this.eventsLink.click();
  }
  async goToBookingsLink() {
    await this.bookingsLink.click();
  }
}
