import pentatrionTw from "./src/tailwind/pentatrionTw";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `./src/components/**/*.{ts,tsx}`,
    `./src/hooks/**/*.{ts,tsx}`,
    `./src/lib/**/*.{ts,tsx}`,
    `./src/redux/**/*.{ts,tsx}`,
    `./src/styles/**/*.{ts,tsx}`,
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  safelist: ["light", "dark"],
  plugins: [pentatrionTw],
};
