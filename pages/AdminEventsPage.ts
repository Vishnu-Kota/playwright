import { Page, Locator } from "@playwright/test";

export class AdminEventsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly description: Locator;
  readonly city: Locator;
  readonly venue: Locator;
  readonly eventDate: Locator;
  readonly price: Locator;
  readonly totalSeats: Locator;
  readonly addEventButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("#event-title-input");
    this.description = page.locator("#admin-event-form textarea");
    this.city = page.getByPlaceholder("e.g. Bangalore");
    this.venue = page.getByPlaceholder("Venue name & address");
    this.eventDate = page.getByLabel("Event Date & Time");
    this.price = page.getByPlaceholder("0.00");
    this.totalSeats = page.getByPlaceholder("e.g. 500");
    this.addEventButton = page.locator("#add-event-btn");
  }

  async goTo() {
    await this.page.goto(
      "https://eventhub.rahulshettyacademy.com/admin/events",
    );
  }

  async createEvent(title: string) {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    await this.title.fill(title);
    await this.description.fill("Event created by a Playwright test");
    await this.city.fill("Bangalore");
    await this.venue.fill("Test Venue, MG Road");
    await this.eventDate.fill(date.toISOString().slice(0, 16));
    await this.price.fill("100");
    await this.totalSeats.fill("50");
    await this.addEventButton.click();
  }
}
