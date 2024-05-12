/** @type {import('tailwindcss').Config} */
export default {
  content: [`./components/**/*.{ts,tsx}`],
  darkMode: ["class"],
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
      DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.15)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.15)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.35)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.1)",
      none: "none",
    },
    extend: {},
  },
  plugins: [],
};
