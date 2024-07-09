import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import unpluginInjectPreload from "unplugin-inject-preload/vite";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));
// const rootDir = resolve(projectDir, "../..");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
  },
  optimizeDeps: {
    include: ["pentatrion-geo", "maplibre-gl"]
  },
  resolve: {
    alias: {
      "~": resolve(projectDir, "src"),

      // "~mrc": resolve(rootDir, "packages/maplibre-react-components"),
      // "~design": resolve(rootDir, "packages/pentatrion-design/dist"),
    },
  },

  plugins: [
    react(),
    unpluginInjectPreload({
      files: [
        {
          outputMatch: /marker-shadow-centered-[a-zA-Z0-9]*\.png$/,
        },
      ],
    }),
  ],

  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    include: ["src/**/*.test.ts?(x)"],
    watch: false,
  },
});
