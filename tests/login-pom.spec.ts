import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login("test@dummy.com", "Pass@1234");

  // Logged in = the Logout button is there. It only exists after a successful login.
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
