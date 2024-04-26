import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import unpluginInjectPreload from "unplugin-inject-preload/vite";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(projectDir, "../..");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
  },
  resolve: {
    alias: {
      "~": resolve(projectDir, "src"),

      "~design": resolve(rootDir, "packages/pentatrion-design"),
      "~geo": resolve(rootDir, "packages/pentatrion-geo"),
      "~mrc": resolve(rootDir, "packages/maplibre-react-components"),
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
});
