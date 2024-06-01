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

    "./node_modules/pentatrion-design/components/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/hooks/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/lib/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/redux/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/styles/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [pentatrionTw],
};
