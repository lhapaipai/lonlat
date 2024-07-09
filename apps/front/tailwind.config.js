import { pentatrionTw } from "pentatrion-design/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",

    // "./node_modules/pentatrion-design/components/**/*.js",
    // "./node_modules/pentatrion-design/hooks/**/*.js",
    // "./node_modules/pentatrion-design/redux/**/*.js",
    "../../node_modules/pentatrion-design/lib/**/*.js",
    "../../node_modules/pentatrion-design/components/**/*.js",
    "../../node_modules/pentatrion-design/hooks/**/*.js",
    "../../node_modules/pentatrion-design/redux/**/*.js",

    "../pentatrion-geo/dist/api/**/*.js",
    "../pentatrion-geo/dist/components/**/*.js",
    "../pentatrion-geo/dist/geo-options/**/*.js",
    "../pentatrion-geo/dist/maplibre/**/*.js",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [pentatrionTw()],
};
