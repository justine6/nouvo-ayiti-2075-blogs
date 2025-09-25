import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",   // ✅ needed for React DOM testing
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      all: true,
      reportsDirectory: "./coverage",
    },
  },
});
