import { defineConfig } from "vitest/config";

import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const projectDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "~mrc": resolve(projectDir, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: [
      "vitest-webgl-canvas-mock",
      "./src/tests/vitest-setup.ts",
      "./src/tests/mocks/web-worker.ts",
    ],
    include: ["src/**/*.test.ts?(x)"],
    watch: false,
  },
});
