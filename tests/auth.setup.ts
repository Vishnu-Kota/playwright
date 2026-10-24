import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { user } from "../test-data/user";

setup("log in once and save it", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login(user.email, user.password);
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
