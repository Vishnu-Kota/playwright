import { Page, Locator } from "@playwright/test";

export class EventsPage {
  readonly page: Page;
  readonly card: Locator;
  constructor(page: Page) {
    this.page = page;
    this.card = page.getByTestId("event-card");
  }
  cardFor(title: string) {
    return this.card.filter({ hasText: title });
  }

  async goTo() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/events");
  }

  async getSeats(title: string) {
    const seatsText = await this.cardFor(title).getByText("seat").innerText();
    const seats = parseInt(seatsText);
    return seats;
  }

  async bookNow(title: string) {
    await this.cardFor(title).getByTestId("book-now-btn").click();
  }
}
