import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EventsPage extends BasePage {
  readonly card: Locator;
  constructor(page: Page) {
    super(page);
    this.card = page.getByTestId("event-card");
  }
  cardFor(title: string) {
    return this.card.filter({ hasText: title });
  }

  async goTo() {
    await this.open("/events");
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
