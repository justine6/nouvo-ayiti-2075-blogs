/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,

  // Keep Next.js defaults
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],

  // Make sure the plugins that own our rules are loaded
  plugins: ["@typescript-eslint", "prettier"],

  rules: {
    // Prettier: keep endOfLine flexible for Windows vs Unix, WARN only
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto"
      }
    ],

    // TS rules: still strict, but WARN instead of ERROR
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ]
  }
};
