import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByPlaceholder("you@email.com");
    this.password = page.getByLabel("Password");
    this.loginButton = page.locator("#login-btn");
  }

  async goTo() {
    await this.open("/login");
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
