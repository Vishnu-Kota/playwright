import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { user } from "../test-data/user";

test("login with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login(user.email, user.password);

  // Logged in = the Logout button is there. It only exists after a successful login.
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
