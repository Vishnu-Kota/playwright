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
