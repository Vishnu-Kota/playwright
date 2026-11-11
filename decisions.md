# Decisions

## 1. Pages extend BasePage (inheritance)

**Date:** 11 Nov 2026
**Why:** Every page needs the page object and the same way to open a URL and wait for it.
So I put that in BasePage once and every page extends it, instead of writing it again in each page.

## 2. Header is a component inside BasePage (composition)

**Date:** 11 Nov 2026
**Why:** The header is not a page. It is a component that shows on every page and takes you to the different tabs of the site.
A page has a header, it is not a header. So BasePage creates one Header and every page gets it.
If I need a footer or a modal later, I can add it the same way without changing what the pages extend.

## 3. Use data-testid for locators when the site has them

**Date:** 11 Nov 2026
**Why:** If I find a link by its text and the link gets renamed, the test has to be changed too, otherwise it fails even though the site works fine.
A data-testid does not change when the text changes, so the test only fails when something is actually broken.
