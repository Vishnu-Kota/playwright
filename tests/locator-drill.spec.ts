// Locator drill: ten locators on a real page with messy markup, written WITHOUT opening the docs.
//
// Split across days (re-aligned 4 Oct to the course order):
//   items 5-6   CSS        -> day 15-16 (section 4 teaches CSS)
//   items 7-10  XPath      -> day 16 (not in the course; learn it from zero first)
//   items 1-4   getBy*     -> day 19 (section 7)
//
// Site: https://rahulshettyacademy.com/AutomationPractice/
//   It's Rahul's own practice page, so it matches the course. It has tables with no ids,
//   radio buttons, a dynamic dropdown, and repeated classes, which is the mess you want.
//
// Rules:
//   - Write each locator, run it, and only then check whether it matched the right element.
//   - Assert something real on each (toBeVisible, toHaveText, toHaveCount), not just "it exists".
//   - Locators 5-10 use the `css=` / `xpath=` prefixes inside page.locator(). That's the point:
//     practise XPath inside Playwright, not in a sandbox.
//   - If one fails, write the wrong version in a comment above the right one. That's your gap log.
//
// Playwright is already set up in this repo.
// Run:          npx playwright test tests/locator-drill.spec.ts --headed --project=chromium
//
// 1.  getByRole: the "Open Window" button.
// 2.  getByLabel or getByRole: tick the checkbox for "Option2".
//     Which one worked, and why might the other one not? One line.
// 3.  getByText: the "Switch Tab Example" heading. Then try exact: true vs false and note the difference.
// 4.  getByPlaceholder or getByRole: type "Ind" into the autocomplete box, then pick "India" from the list.
// 5.  css= by id: the dropdown select. Choose "Option3".
// 6.  css= by attribute (no id, no class): a radio button by its value.
// 7.  xpath= relative, with contains(): any element whose text contains "Practice".
// 8.  xpath= with starts-with() on an attribute.
// 9.  xpath= with a sibling axis: in the course table, the PRICE cell in the same row as
//     the course whose name contains "JMETER". No index numbers allowed.
//     Bonus: change it to contains "Selenium" and see what toHaveText does with 4 matches.
// 10. xpath= with parent or ancestor: start from a cell's text and climb to its <tr>, then
//     assert the row's cell count.
//
// Then write #9 as an ABSOLUTE XPath (copy it from DevTools), and write one line on what
// breaks it. That line goes in the cheatsheet.

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
});

// Your ten tests go here.
