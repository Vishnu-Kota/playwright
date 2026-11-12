import { test as base, expect, APIRequestContext } from "@playwright/test";
import { user } from "../test-data/user";
import { env } from "../config/environments";

export const test = base.extend<{
  token: string;
  api: APIRequestContext;
}>({
  token: async ({ request }, use) => {
    const response = await request.post(`${env.apiURL}auth/login`, {
      data: { email: user.email, password: user.password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    await use(body.token);
  },

  api: async ({ playwright, token }, use) => {
    const context = await playwright.request.newContext({
      baseURL: env.apiURL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from "@playwright/test";
