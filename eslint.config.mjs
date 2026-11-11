import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules",
      "playwright-report",
      "artifacts",
      "test-results",
      ".claude",
      "playwright/.auth",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["tests/**/*.ts"],
    ...playwright.configs["flat/recommended"],
  },
  {
    files: ["fixtures/**/*.ts"],
    rules: { "no-empty-pattern": "off" },
  },
  prettier,
]);
