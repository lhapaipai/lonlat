import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm"],
  esbuildOptions(options) {
    options.external = [
      "@floating-ui/dom",
      "@floating-ui/react",
      "@googlemaps/js-api-loader",
      "@mapbox/point-geometry",
      "clsx",
      "fuse.js",
      "maplibre-gl",
      "maplibre-react-components",
      "nanoid",
      "pentatrion-design",
      "react",
      "react-dom",
      "react-sortablejs",
    ];
  },
  shims: true,
  clean: true,
});
