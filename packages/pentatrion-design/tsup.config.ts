import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  dts: true,
  format: ["esm"],
  esbuildOptions(options) {
    options.external = [
      "@floating-ui/react",
      "clsx",
      "react",
      "react-dom",
      "react-polymorphic-types",
      "react-sortablejs",
      "tailwindcss",
    ];
  },
  shims: true,
  clean: true,
});
