import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // "~pentatrion-fonts": resolve(projectDir, "../../packages/pentatrion-design/fonts"),
    },
  },
  plugins: [react()],
});
