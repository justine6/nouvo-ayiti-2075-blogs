import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"], // you’ll see console + HTML reports
      all: true,                          // include untested files
      lines: 80,                          // global min coverage
      branches: 80,
      functions: 80,
      statements: 80,
      thresholds: {
        // enforce 100% only for middleware
        "src/middleware.ts": {
          lines: 100,
          branches: 100,
          functions: 100,
          statements: 100,
        },
      },
    },
  },
});
