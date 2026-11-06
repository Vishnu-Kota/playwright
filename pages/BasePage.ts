import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path: string) {
    await this.page.goto(path);
  }

  async waitForUrl(path: string) {
    await this.page.waitForURL(`**${path}`);
  }
}
