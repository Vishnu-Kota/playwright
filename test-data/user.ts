// Login details come from environment variables, never from the repo.
// Locally they are loaded from .env (see .env.example); in CI from GitHub Secrets.
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const user = {
  email: required("EVENTHUB_EMAIL"),
  password: required("EVENTHUB_PASSWORD"),
  // booking form details: dummy values, not real personal data
  name: "Test User",
  phone: "9876543210",
};
