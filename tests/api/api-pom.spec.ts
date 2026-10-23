import { test, expect } from "../../api-fixtures";
import { user } from "../../test-data/user";

test.describe("EventHub API", () => {
  test("login returns a token", async ({ token }) => {
    expect(token).toBeTruthy();
  });

  test("login with wrong password fails", async ({ request }) => {
    const response = await request.post("auth/login", {
      data: { email: user.email, password: "wrongpass" },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe("Invalid email or password");
  });

  test("me returns my email", async ({ authRequest }) => {
    const response = await authRequest.get("auth/me");

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user.email).toBe(user.email);
  });

  test("events list is not empty", async ({ authRequest }) => {
    const response = await authRequest.get("events");

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test("me without a token is 401", async ({ request }) => {
    const response = await request.get("auth/me");

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe("Unauthorized");
  });
});
