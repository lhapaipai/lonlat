import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~design": projectDir,
    },
  },
  test: {
    // globals: true
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],

    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
  },
});
