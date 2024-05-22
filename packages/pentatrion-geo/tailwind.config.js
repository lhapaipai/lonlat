import { pentatrionTw } from "pentatrion-design";

/** @type {import('tailwindcss').Config} */
export default {
  content: [`./src/**/*.{ts,tsx}`, "./node_modules/pentatrion-design/dist/index.js"],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [pentatrionTw],
};
