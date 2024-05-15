import { defineConfig } from "vitest/config";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(projectDir, "../..");

export default defineConfig({
  resolve: {
    alias: {
      "~geo": resolve(projectDir, "src"),
      "~design": resolve(rootDir, "packages/pentatrion-design"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.test.ts?(x)"],
    watch: false,
  },
});
