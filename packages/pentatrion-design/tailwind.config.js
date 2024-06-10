import { pentatrionTw, pentatrionTypographyExtend } from "./tailwind";
import typography from "@tailwindcss/typography";

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
    extend: {
      typography: pentatrionTypographyExtend,
    },
  },
  safelist: ["light", "dark"],
  plugins: [pentatrionTw({}), typography],
};
