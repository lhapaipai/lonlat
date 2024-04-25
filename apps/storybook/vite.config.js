import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const storybookDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(storybookDir, "../..");

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@storybook/react": resolve(storybookDir, "node_modules/@storybook/react"),
      "@storybook/addon-actions": resolve(storybookDir, "node_modules/@storybook/addon-actions"),

      "~design": resolve(projectDir, "packages/pentatrion-design"),
      "~geo": resolve(projectDir, "packages/pentatrion-geo"),
      "maplibre-react-components": resolve(projectDir, "packages/maplibre-react-components"),

      // deprecated
      "pentatrion-design": resolve(projectDir, "packages/pentatrion-design"),
      "pentatrion-geo": resolve(projectDir, "packages/pentatrion-geo"),
    },
  },
});
