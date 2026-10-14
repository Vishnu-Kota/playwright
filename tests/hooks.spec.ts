import { test } from "../fixtures";

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

test("test A", async ({ workerLog }) => {
  console.log("test A");
});

test("test B", async ({ workerLog }) => {
  console.log("test B");
});
