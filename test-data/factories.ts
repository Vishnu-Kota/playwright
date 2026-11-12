const worker = process.env.TEST_WORKER_INDEX ?? "0";

let counter = 0;

function uniqueTag() {
  counter++;
  return `w${worker}-${Date.now()}-${counter}`;
}

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export function makeEvent(overrides = {}) {
  console.log("making event in worker", worker);
  return {
    title: `Test Event ${uniqueTag()}`,
    category: "Conference",
    venue: "Test Venue",
    city: "Bangalore",
    eventDate: new Date(Date.now() + ONE_WEEK).toISOString(),
    price: 100,
    totalSeats: 50,
    ...overrides,
  };
}
