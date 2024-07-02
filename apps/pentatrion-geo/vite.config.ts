import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    include: [
      "(api|components|geo-options|maplibre|projection|url)/**/*.test.ts?(x)",
    ],
    watch: false,
  },
});
