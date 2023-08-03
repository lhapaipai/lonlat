import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        "01-cluster": resolve(__dirname, "examples/01-cluster.html"),
        "02-cluster-div": resolve(__dirname, "examples/02-cluster-div.html"),
        "03-popup": resolve(__dirname, "examples/03-popup.html"),
        "04-satellite": resolve(__dirname, "examples/04-satellite.html"),
        "05-draw": resolve(__dirname, "examples/05-draw.html"),
        "06-icons": resolve(__dirname, "examples/06-icons.html"),
        "07-change-layer-color": resolve(__dirname, "examples/07-change-layer-color.html"),
        "08-inspect": resolve(__dirname, "examples/08-inspect.html"),
        "09-toggle-style": resolve(__dirname, "examples/09-toggle-style.html"),
        "10-my-popup": resolve(__dirname, "examples/10-my-popup.html"),
        "11-update-path": resolve(__dirname, "examples/11-update-path.html"),
      },
    },
  },
});
