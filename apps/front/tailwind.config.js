// import { resolve, dirname } from "node:path";
// import { fileURLToPath } from "node:url";
import { pentatrionTw } from "pentatrion-design";

// const storybookDir = dirname(fileURLToPath(new URL(import.meta.url)));
// const projectDir = resolve(storybookDir, "../..");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/dist/index.js",
    "./node_modules/pentatrion-geo/dist/index.js",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [pentatrionTw],
};
