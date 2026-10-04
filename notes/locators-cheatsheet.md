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
| id | `#username` · Selenium `By.id("username")` | Usually | The id you see when you inspect the element, with `#` in front. Meant to be unique on the page, so it finds one element on its own. Breaks if the id is generated, e.g. `input-4821`. |
| name | `[name="username"]` · Selenium `By.name("username")` | Usually | The `name` attribute you see when you inspect it. Common on form fields, but not always unique. |
| class | `.card-title` · Selenium `By.className("card-title")` | No | `.classname`. Classes are for styling, so many elements share them: the Sign In button had three (`btn btn-info btn-md`), and `.btn` matches every button. |
| CSS selector | `#id` · `.class` · `[attr="value"]` · `tag` · `.card-title a` | Depends on what you build it from | Not a fourth option: it is the language the three above are written in. Combine blocks to narrow down, e.g. `input[type="checkbox"]`. A bare word is a tag name. |
| XPath | | | |

The preferred one, and why, in two lines:

> id first, because it is meant to be unique on the page, so one id finds exactly one element.
> Classes and names can be shared by many elements on the same page, so they need combining with something else to stay unique.
> If the id is dynamic (e.g. `input-4821`), use CSS on an attribute that does not change, like `name` or `data-testid`.

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
