import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));
function examplePath(dirname: string) {
  return resolve(projectDir, "src", dirname, "index.html");
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // "~pentatrion-fonts": resolve(projectDir, "../../packages/pentatrion-design/fonts"),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        deps: examplePath("deps"),
      },
    },
  },
});
