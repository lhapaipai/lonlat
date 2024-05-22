import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
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
  splitting: false,
  shims: true,
  clean: true,
});
