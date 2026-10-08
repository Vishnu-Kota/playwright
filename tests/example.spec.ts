// 1. Log in with the practice user and assert the shop page loaded
// 2. Find the product by its name in the card list and click its Add to Cart
// 3. Open the cart and assert the product is in it
// 4. Checkout: pick the country from the auto-suggest dropdown, assert it was selected

import { expect, test } from "@playwright/test";

test("user can add a product to the cart and reach checkout", async ({
  page,
}) => {
  const webUrl = "https://rahulshettyacademy.com/client/#/auth/login";
  const afterLoginUrl =
    "https://rahulshettyacademy.com/client/#/dashboard/dash";
  const cartUrl = "https://rahulshettyacademy.com/client/#/dashboard/cart";
  const emailId = page.getByPlaceholder("email@example.com");
  const password = page.getByPlaceholder("enter your passsword");
  const login = page.getByRole("button", { name: "Login" });
  const productName = "ADIDAS ORIGINAL";
  const cart = page.locator(".cart");

  const card = page.locator(".card-body").filter({ hasText: productName });

  await page.goto(webUrl);
  await emailId.fill("myspam387@gmail.com");
  await password.fill("Pass1234");
  await login.click();
  await expect(page).toHaveURL(afterLoginUrl);
  await card.getByRole("button", { name: "Add To Cart" }).click();
  await expect(page.locator("[routerlink*='cart'] label")).toHaveText("1");

  await page.locator("[routerlink*='cart']").click();
  await expect(page).toHaveURL(cartUrl);
  await expect(cart.filter({ hasText: productName })).toBeVisible();

  await cart.getByRole("button", { name: "Buy Now" }).click();
  await expect(page).toHaveURL(/dashboard\/order/);

  const country = page.getByPlaceholder("Select Country");

  await country.pressSequentially("India");
  await page.locator(".ta-item").getByText("India", { exact: true }).click();
  await expect(country).toHaveValue("India");
  await page.getByText("Place Order").click();
  await expect(page).toHaveURL(/dashboard\/thanks/);
  const rawText = await page
    .locator("label")
    .filter({ hasText: /[a-f0-9]{24}/ })
    .textContent();
  const orderId = rawText?.split("|")[1].trim();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await expect(page).toHaveURL(/myorders/);
  await expect(
    page.locator("tbody tr").filter({ hasText: orderId! }),
  ).toBeVisible();
});
