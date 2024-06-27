import { pentatrionTw } from "pentatrion-design";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./api/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./geo-options/**/*.{ts,tsx}",
    "./maplibre/**/*.{ts,tsx}",
    "./projection/**/*.{ts,tsx}",
    "./url/**/*.{ts,tsx}",

    "./node_modules/pentatrion-design/components/**/*.js",
    "./node_modules/pentatrion-design/hooks/**/*.js",
    "./node_modules/pentatrion-design/lib/**/*.js",
    "./node_modules/pentatrion-design/redux/**/*.js",
    "./node_modules/pentatrion-design/styles/**/*.js",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [pentatrionTw()],
};
