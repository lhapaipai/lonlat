import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./index.ts",
    // "./redux/index.ts"
  ],
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
      "react-redux",
      "@reduxjs/toolkit",
    ];
  },
  splitting: false,
  shims: true,
  clean: true,
});
