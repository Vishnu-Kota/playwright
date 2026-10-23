import { test as base, expect, APIRequestContext } from "@playwright/test";
import { user } from "./test-data/user";

export const test = base.extend<{
  token: string;
  authRequest: APIRequestContext;
}>({
  token: async ({ request }, use) => {
    const response = await request.post("auth/login", {
      data: { email: user.email, password: user.password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    await use(body.token);
  },

  authRequest: async ({ playwright, baseURL, token }, use) => {
    const context = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from "@playwright/test";
