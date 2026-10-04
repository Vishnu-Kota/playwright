# Waits: my notes

Written from `tests/waits.spec.ts`, day 16 (4 Oct 2026).

## A. allTextContents() does not wait

- Read the titles straight after the Sign In click, with no wait: got `[]`, and the test still **passed**, because there was no `expect`.
- Tried `page.waitForLoadState("networkidle")`: still `[]`. It waited on the **old** page. After the click the site shows "Signing .." and only then navigates, so the login page was already idle and the wait returned at once.
- Fixed with `await titles.first().waitFor()`: 4 titles every run, and 6.8 s instead of 13–15 s.

> Wait for the thing you need, not for "the page" and never for the clock.

## B. A forced failure: `toHaveCount(5)`

- **Expected** is my claim (5). **Received** is reality (4). I read these the wrong way round the first time.
- It kept trying for 30 s, then failed on the **test** timeout.
- Config bug: `expect` timeout is 40 s in `playwright.config.ts`, but the test timeout is 30 s, so the assertion can never use its full time. The assertion timeout must be shorter than the test timeout. Fix on day 23 (config).
- Why it did not fail instantly: `expect(locator)` is a **web-first assertion**. It re-checks the page until the condition is true or time runs out.

| | Checks once | Keeps retrying |
|---|---|---|
| `allTextContents()`, `count()` | ✅ | |
| `expect(locator).toHaveCount()`, `.toBeVisible()`, `.toHaveText()` | | ✅ |
| `locator.click()`, `.fill()`, `.waitFor()`, `.first().textContent()` | | ✅ |

So `await expect(titles).toHaveCount(4)` would have fixed A on its own. **A web-first assertion is a wait.**

## C. Actionability checks before click()

Picture clicking a real button with your finger:

1. **Visible** — can I see it? It has a size, and is not `display: none` or `visibility: hidden`.
2. **Stable** — is it still, or still moving (sliding in, animating)?
3. **Receives events** — is anything on top of it? A cookie banner or spinner over the button would take the click.
4. **Enabled** — is it greyed out (`disabled`)?

`fill()` also checks **editable** (not read-only).

Visible and receives events are separate: a button behind a cookie banner is still drawn on the page (visible ✅), but a click at its spot hits the banner (receives events ❌). That case is a classic flaky test — it passes on a fast machine before the banner loads.

> Interview line: Playwright clicks only once the element is visible, stable, receiving events and enabled, so I don't write waits before actions.

## D. Wait vocabulary (Selenium asks this even in Playwright interviews)

Selenium has no auto-waiting, so it offers three waits:

| Wait | What it is |
|---|---|
| **Implicit** | One global setting on the driver: every element *lookup* keeps trying for **up to** N seconds, and stops early once found. Only checks that the element exists, not that it is clickable. |
| **Explicit** (`WebDriverWait`) | Wait until **a specific condition** is true for **a specific element**, with a maximum time. "Until Sign In is clickable, max 10 s." The key word is *condition*, not time. |
| **Fluent** | An explicit wait you can tune: you also choose **how often to check** (polling interval) and **which errors to ignore** while waiting. Rarely needed. |

Mapping to Playwright: explicit ≈ `locator.waitFor()` / `expect(locator).toBeVisible()`; auto-waiting ≈ an explicit wait for actionability built into every action; no implicit wait.

**Why `waitForTimeout()` / `Thread.sleep()` is always wrong.** It is a *pause*, not a wait: it waits for nothing and never fails. `3000` is 3 seconds — Playwright times are milliseconds.

| The API takes… | With a 3 s pause |
|---|---|
| 5 s (slow day) | The pause ends, the data is not there, the test fails though the feature works: flaky. |
| 0.5 s (fast day) | The test idles until 3 s: 2.5 s wasted, every run. |

Instead, wait on the data itself: `await expect(page.locator(".result-row").first()).toBeVisible();`

**Two sentences:**

> `waitForTimeout` waits on a clock, not on the thing you need, so it is flaky when the app is slow and wasteful when it is fast. Playwright waits on the condition itself — auto-waiting and web-first assertions — and in a tool without that I would use explicit waits on specific conditions, never sleeps.

## E. Late elements and choosing assertions

- **An error message that appears 3 s after a wrong login:** `await expect(alert).toBeVisible()` — it retries until the message shows. If it can be slower than the default 5 s, raise the timeout for that one check: `toBeVisible({ timeout: 10_000 })`.
- **After a click, assert its effect**, not that it happened: checkbox → `toBeChecked()`, dialog → `toBeVisible()`, link → `toHaveURL()`, delete → `toHaveCount(n - 1)`.
- **Value vs attribute:** `toHaveValue` is what was typed in the box; `toHaveAttribute("type", "password")` is the label in the HTML. The password field gets both, because `type` changing to `text` would show passwords on screen.
- Pick assertions by asking *what bug would this catch?*, not *what can I check?*

## My first attempt, from memory (4 Oct)

- Actionability: 2 of 4. Got visible and enabled. Said "is it performing any action" for stable, and "is it navigatable" for receives events.
- Implicit: right. Explicit: wrong — said "time per test function"; it is a condition per element. Fluent: half — knew it is like explicit, not what it adds.
- waitForTimeout: right example (slow API), but called 3000 ms "30 s", called it global, and said it fails. It is 3 s, at one line, and never fails.
