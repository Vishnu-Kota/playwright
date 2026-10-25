import { test as base, expect, APIRequestContext } from "@playwright/test";
import { user } from "./test-data/user";

const API_URL = "https://api.eventhub.rahulshettyacademy.com/api/";

export const test = base.extend<{
  token: string;
  authRequest: APIRequestContext;
}>({
  token: async ({ request }, use) => {
    const response = await request.post(`${API_URL}auth/login`, {
      data: { email: user.email, password: user.password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    await use(body.token);
  },

  authRequest: async ({ playwright, token }, use) => {
    const context = await playwright.request.newContext({
      baseURL: API_URL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from "@playwright/test";
