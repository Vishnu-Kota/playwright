import { test, expect } from "@playwright/test";

test("alert shows the name I typed", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  let message = "";
  page.once("dialog", async (dialog) => {
    message = dialog.message();
    await dialog.accept();
  });

  await page.locator("#name").fill("Vishnu");
  await page.locator("#alertbtn").click();

  expect(message).toContain("Vishnu");
});

test("iframe: find content inside it", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  const frame = page.frameLocator("#courses-iframe");
  await expect(frame.locator("body")).toBeVisible();
  await expect(frame.getByRole("link").first()).toBeVisible();
});

test("confirm: press OK", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  let message = "";
  page.once("dialog", async (dialog) => {
    message = dialog.message();
    await dialog.accept();
  });

  await page.locator("#name").fill("Vishnu");
  await page.locator("#confirmbtn").click();

  expect(message).toContain("Are you sure");
});

test("confirm: press Cancel", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  let type = "";
  page.once("dialog", async (dialog) => {
    type = dialog.type();
    await dialog.dismiss();
  });

  await page.locator("#confirmbtn").click();

  expect(type).toBe("confirm");
});

test("mouse hover", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.getByRole("link", { name: "Top" })).toBeHidden();
  await page.getByRole("button", { name: "Mouse Hover" }).hover();
  await expect(page.getByRole("link", { name: "Top" })).toBeVisible();
});

test("keyboard press", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const country = page.locator("#autocomplete");
  await expect(country).toHaveValue("");
  await country.pressSequentially("Ind");
  await expect(page.locator(".ui-menu-item").first()).toBeVisible();
  await country.press("ArrowDown");
  await country.press("ArrowDown");
  await country.press("Enter");
  await expect(country).toHaveValue("India");
});
