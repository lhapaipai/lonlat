import pentatrionTw from "./tailwind/pentatrionTw";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `./components/**/*.{ts,tsx}`,
    // `./hooks/**/*.{ts,tsx}`,
    `./lib/**/*.{ts,tsx}`,
    `./styles/**/*.{ts,tsx}`,
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  safelist: ["light", "dark"],
  plugins: [pentatrionTw],
};
