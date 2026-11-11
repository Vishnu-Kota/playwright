import { Page } from "@playwright/test";
import { Header } from "../components/Header";

export class BasePage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
  }

  async open(path: string) {
    await this.page.goto(path);
  }

  async waitForUrl(path: string) {
    await this.page.waitForURL(`**${path}`);
  }
}
