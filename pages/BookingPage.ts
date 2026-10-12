import { Page, Locator } from "@playwright/test";

export class BookingPage {
  readonly page: Page;
  readonly email: Locator;
  readonly fullName: Locator;
  readonly phone: Locator;
  readonly plusButton: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByPlaceholder("you@email.com");
    this.fullName = page.getByPlaceholder("Your full name");
    this.phone = page.locator("#phone");
    this.plusButton = page.getByRole("button", { name: "+", exact: true });
    this.confirmButton = page.getByRole("button", {
      name: "Confirm Booking",
      exact: true,
    });
  }

  async fillDetailsAndConfirm(name: string, email: string, phone: string) {
    await this.fullName.fill(name);
    await this.email.fill(email);
    await this.phone.fill(phone);
    await this.confirmButton.click();
  }
}
