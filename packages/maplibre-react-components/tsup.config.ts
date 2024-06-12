import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/components/RFloatingPopup/index.ts"],
  dts: true,
  format: ["esm"],
  esbuildOptions(options) {
    options.external = ["react", "react-dom", "maplibre-gl", "@floating-ui/dom"];
  },
  shims: true,
  clean: true,
});
