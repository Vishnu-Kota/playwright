# Playwright + TypeScript test suite: EventHub

UI and API tests for **EventHub**, an event-booking web app (`eventhub.rahulshettyacademy.com`) with a REST API behind it. The suite is written in **Playwright + TypeScript** and covers browser journeys (log in, create an event, book it, check refunds) and the API underneath them, using page objects, custom fixtures and a log-in-once auth setup.

This is my working SDET portfolio. I add to it as I build out the framework; see [Roadmap](#roadmap).

## What's covered

**UI tests (Chromium, Firefox, WebKit)**

- Create an event, book it, and check the seat count drops by one
- Refund rules: a single-ticket booking is eligible for a refund, a group booking isn't
- Booking flow through page objects
- Log in once, reuse the session in every test
- Interactions: alerts, confirm dialogs (OK / Cancel), iframes, hover, keyboard
- Waiting strategies and the three Playwright timeouts (assertion, action, test), each demonstrated by a test

**API tests (no browser)**

- `POST auth/login` returns a token; a wrong password returns 400
- `GET auth/me` with a token returns the user; without one it returns 401
- `GET events` returns a non-empty list
- **Chained CRUD:** create an event, read it, update it, delete it, then confirm a 404, with the event id passed between steps. `afterEach` deletes the event if any step fails, so a run leaves nothing behind.

## How it's built

| Piece | What it does |
|---|---|
| **Page objects** (`pages/`) | `LoginPage`, `BookingPage`, `EventsPage`, `AdminEventsPage`. Locators live in one place; tests read like user steps. |
| **UI fixtures** (`fixtures.ts`) | Hand each test ready-made page objects and a logged-in page, so tests don't construct them. |
| **Auth setup project** (`tests/auth.setup.ts`) | Logs in once and saves `storageState`. Browser projects depend on it and start already logged in. |
| **API fixtures** (`api-fixtures.ts`) | `token` logs in through the API; `authRequest` is a request context that sends the Bearer token on every call and is disposed afterwards. |
| **Separate `api` project** (`playwright.config.ts`) | API specs run in their own project with no setup dependency, so they never launch a browser. Browser projects ignore `tests/api/`. |
| **Failure artifacts** | Screenshot, video and trace are kept **only for failing tests**, in `artifacts/`. |
| **Test data** (`test-data/`) | The test user is read from JSON, not hard-coded in tests. |

```
pages/          page objects
tests/          UI specs + auth.setup.ts
tests/api/      API specs (request fixture, no browser)
fixtures.ts     UI fixtures
api-fixtures.ts token + authenticated request fixtures
test-data/      test user (a dummy account on the public practice site)
notes/          my own notes: locator cheatsheet, waits
```

## Run it

```bash
npm ci
npx playwright install
```

```bash
npx playwright test --project=api        # API tests only, no browser (~2s)
npx playwright test --project=chromium   # UI tests in Chromium (runs the login setup first)
npx playwright test                      # everything
npx playwright show-report               # open the HTML report
```

The tests run against the live public EventHub practice site, so they need an internet connection.

## Decisions

- **Why the API tests are a separate project.** If they sat with the UI tests, every API spec would run three times (once per browser) and wait for the browser login setup. In their own project they finish in about 2 seconds.
- **Why `afterEach` cleanup instead of only a delete step.** If the update step fails, the delete step never runs. The cleanup hook runs anyway, so a failed run still leaves no test events behind.
- **Why the CRUD test doesn't assert on everything.** It checks status codes and the fields that matter (title, id), but not `price`: the API accepts a number and returns a string, a real-world quirk worth knowing rather than fighting.
- **Why log in once.** Logging in through the UI before every test is slow and makes every test depend on the login page. The setup project does it once and saves the session.

## Roadmap

**Phase 1 check (31 Oct 2026): passed.** UI and API automation run green, the Postman collection runs with Newman in CI, and a UI test checks an event seeded through the API. Still to do: network mocking.

- [x] Page objects, fixtures, storageState auth setup
- [x] API tests with the request fixture, and a chained CRUD test with cleanup
- [ ] Network interception and mocking
- [ ] Framework structure: base pages, test-data factories, multi-environment config
- [ ] GitHub Actions: sharded parallel runs, Allure reports, failure artifacts on CI
- [ ] Database checks (SQL) alongside API tests
- [ ] Run dependencies in Docker Compose; CI that talks to AWS

## About me

QA and release-validation engineer at L&T Finance (fintech, consumer lending app with 10M+ downloads). I test APIs and releases, automate with Playwright + TypeScript and Python, and am building toward SDET and cloud work.
[LinkedIn](https://www.linkedin.com/in/vishnu-kota0710/)
