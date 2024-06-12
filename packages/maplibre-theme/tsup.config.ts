import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/fontello.ts"],
  format: ["esm"],
  esbuildOptions(options) {
    options.external = ["prompts", "axios", "form-data", "rimraf", "extract-zip"];
  },
  outDir: "bin",
  shims: true,
  clean: true,
  minify: false,
});
