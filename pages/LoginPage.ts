import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByPlaceholder("you@email.com");
    this.password = page.getByLabel("Password");
    this.loginButton = page.locator("#login-btn");
  }

  async goTo() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/login");
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
