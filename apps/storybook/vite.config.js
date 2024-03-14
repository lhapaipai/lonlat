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
      "pentatrion-design": resolve(projectDir, "packages/pentatrion-design"),
      "react-maplibre-components": resolve(projectDir, "packages/react-maplibre-components"),
      "maplibre-components": resolve(projectDir, "packages/maplibre-components"),
      "@storybook/react": resolve(storybookDir, "node_modules/@storybook/react"),
      "@storybook/addon-actions": resolve(storybookDir, "node_modules/@storybook/addon-actions"),
    },
  },
});
