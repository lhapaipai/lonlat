import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm"],
  esbuildOptions(options) {
    options.external = [
      "@googlemaps/js-api-loader",
      "@floating-ui/dom",
      "@floating-ui/react",
      "@mapbox/point-geometry",
      "fuse.js",
      "maplibre-gl",
      "maplibre-react-components",
      "nanoid",
      "pentatrion-design",
      "react",
      "react-dom",
    ];
  },
  shims: true,
  clean: true,
});
