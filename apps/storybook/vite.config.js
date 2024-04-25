import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const storybookDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(storybookDir, "../..");

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@storybook/react": resolve(storybookDir, "node_modules/@storybook/react"),
      "@storybook/addon-actions": resolve(storybookDir, "node_modules/@storybook/addon-actions"),

      "~design": resolve(rootDir, "packages/pentatrion-design"),
      "~geo": resolve(rootDir, "packages/pentatrion-geo"),
      "~mrc": resolve(rootDir, "packages/maplibre-react-components"),
    },
  },
});
