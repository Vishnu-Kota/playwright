# Locators: my cheatsheet

Write this from the Rahul Shetty lectures and your own tests, not from the docs.
Every row needs a real example you ran in `tests/locator-drill.spec.ts`.

## Part 1: Playwright's built-in locators (day 19, after section 7)

| Locator | What it matches on | Example I ran | Wins when |
|---|---|---|---|
| `getByRole` | | | |
| `getByLabel` | | | |
| `getByText` | | | |
| `getByTestId` | | | |

Order I reach for them in, and why:

1.
2.
3.
4.

**Test-id over role, in one sentence:**

> 

**Role over test-id, in one sentence (the counter-case, because the interviewer will push):**

> 

`.filter({ hasText })` versus chaining `locator().locator()`: when do you use each?

## Part 2: The tool-agnostic part, Selenium asks the same (day 15, section 4)

| Strategy | Syntax (CSS / XPath / Selenium `By`) | Stable? | Why |
|---|---|---|---|
| id | | | |
| name | | | |
| class | | | |
| CSS selector | | | |
| XPath | | | |

The preferred one, and why, in two lines:

> 

## Part 3: XPath depth (day 16, not in the course)

Absolute vs relative. Write one of each for the same element:

```
absolute:
relative:
```

Why absolute is a trap (name the change to the page that breaks it):

> 

Dynamic XPath: what makes an id "dynamic", and how you target it anyway:

> 

| Function / axis | Syntax from memory | Example I ran |
|---|---|---|
| `contains()` | | |
| `starts-with()` | | |
| `text()` vs `.` | | |
| parent (`..` and `parent::`) | | |
| `following-sibling::` | | |
| `preceding-sibling::` | | |
| `ancestor::` | | |

What can XPath do that CSS can't? (At least two things.)

1.
2.

## Gaps

What I got wrong while writing the drill. One line each, and add them to your dsa-js `gaps.md` too.

-
