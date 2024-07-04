import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  dts: true,
  format: ["esm"],
  esbuildOptions(options) {
    options.external = [
      "@floating-ui/dom",
      "@floating-ui/react",
      "@googlemaps/js-api-loader",
      "@mapbox/point-geometry",
      "@turf/distance",
      "@turf/helpers",
      "@turf/nearest-point-on-line",
      "clsx",
      "fuse.js",
      "maplibre-gl",
      "maplibre-react-components",
      "nanoid",
      "pentatrion-design",
      "react",
      "react-dom",
      "react-sortablejs",
      "simplify-js",
      "d3",
    ];
  },
  shims: true,
  clean: true,
});
