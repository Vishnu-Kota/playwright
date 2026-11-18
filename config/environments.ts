// Addresses for each environment. Not secret, so they live in git.
// EventHub only has one server, so dev and staging are the same for now.
const environments = {
  dev: {
    baseURL: "https://eventhub.rahulshettyacademy.com",
    apiURL: "https://api.eventhub.rahulshettyacademy.com/api/",
  },
  staging: {
    baseURL: "https://eventhub.rahulshettyacademy.com",
    apiURL: "https://api.eventhub.rahulshettyacademy.com/api/",
  },
};

type EnvName = keyof typeof environments; // "dev" | "staging"

const name = process.env.TEST_ENV ?? "dev";

if (!(name in environments)) {
  throw new Error(
    `Unknown TEST_ENV "${name}". Use one of: ${Object.keys(environments).join(", ")}`,
  );
}

export const env = { name, ...environments[name as EnvName] };
