import { test } from "../fixtures/fixtures";

test.beforeAll(async () => {
  console.log("beforeAll");
});

test.beforeEach(async () => {
  console.log("beforeEach");
});

test.afterEach(async () => {
  console.log("afterEach");
});

test.afterAll(async () => {
  console.log("afterAll");
});

test("first test shows hook order", async () => {
  console.log("test A");
});

test("second test shows hook order", async () => {
  console.log("test B");
});
