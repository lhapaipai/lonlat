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
        api01: examplePath("api-01-use-map"),
        api02: examplePath("api-02-highlight"),
        custom01: examplePath("custom-01-my-marker"),
        custom02: examplePath("custom-02-reactive-marker"),
        custom03: examplePath("custom-03-context-handler"),
        custom04: examplePath("custom-04-direction"),
        custom05: examplePath("custom-05-draggable"),
        custom06: examplePath("custom-06-layer-switcher"),
        custom07: examplePath("custom-07-layer-switcher-advanced"),
        custom08: examplePath("custom-08-notifications"),
        own00: examplePath("own-00"),
        own01: examplePath("own-01-map"),
        own02: examplePath("own-02-rmap"),
        own03: examplePath("own-03-rsource-geojson"),
        own04: examplePath("own-04-rsource-image-video"),
        own05: examplePath("own-05-rsource-raster"),
        own06: examplePath("own-06-use-rcontrol"),
        own07: examplePath("own-07-rterrain"),
        own08: examplePath("own-08-pegman-llmarker"),
        own09: examplePath("own-09-delimiter"),
        own10: examplePath("own-10-streetview-only"),
        own11: examplePath("own-11-streetview-vanilla"),
        own12: examplePath("own-12-streetview-gmanager"),
        own13: examplePath("own-13-fps"),
      },
    },
  },
  resolve: {
    alias: {
      "~": resolve(projectDir, "src"),
      "~design": resolve(rootDir, "packages/pentatrion-design"),
      "~geo": resolve(rootDir, "packages/pentatrion-geo"),
      "~mrc": resolve(rootDir, "packages/maplibre-react-components"),
    },
  },
});
