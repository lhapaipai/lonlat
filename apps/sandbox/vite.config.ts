import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(projectDir, "../..");

function examplePath(dirname: string) {
  return resolve(projectDir, "src", dirname, "index.html");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectDir, "index.html"),
        custom03: examplePath("mrc-lonlat/03-context-handler"),
        custom04: examplePath("mrc-lonlat/04-direction"),
        custom05: examplePath("mrc-lonlat/05-draggable"),
        custom06: examplePath("mrc-lonlat/06-layer-switcher"),
        custom07: examplePath("mrc-lonlat/07-layer-switcher-advanced"),
        custom08: examplePath("mrc-lonlat/08-notifications"),

        // "01-cluster": resolve(__dirname, "examples/01-cluster.html"),
        // "02-cluster-div": resolve(__dirname, "examples/02-cluster-div.html"),
        // "03-popup": resolve(__dirname, "examples/03-popup.html"),
        // "04-satellite": resolve(__dirname, "examples/04-satellite.html"),
        // "05-draw": resolve(__dirname, "examples/05-draw.html"),
        // "06-icons": resolve(__dirname, "examples/06-icons.html"),
        // "07-change-layer-color": resolve(__dirname, "examples/07-change-layer-color.html"),
        // "08-inspect": resolve(__dirname, "examples/08-inspect.html"),
        // "09-toggle-style": resolve(__dirname, "examples/09-toggle-style.html"),
        // "10-my-popup": resolve(__dirname, "examples/10-my-popup.html"),
        // "11-update-path": resolve(__dirname, "examples/11-update-path.html"),
      },
    },
  },
  resolve: {
    alias: {
      "~": resolve(projectDir, "src"),
    },
  },
});
