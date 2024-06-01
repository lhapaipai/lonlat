import { pentatrionTw } from "./tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./redux/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  safelist: ["light", "dark"],
  plugins: [pentatrionTw],
};
