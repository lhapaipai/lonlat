import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [`./components/**/*.{ts,tsx}`, `./hooks/**/*.{ts,tsx}`],
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
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      serif: defaultTheme.fontFamily.serif,
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      animation: {
        ripple: "ripple .9s linear",
        "fade-in": "fade-in 250ms ease both",
        "fade-in-list": "fade-in-list 150ms ease both",
        "fade-out": "fade-out 250ms ease both",
        "fade-in-opacity": "fade-in-opacity 250ms ease both",
        flash: "flash 1000ms ease both infinite",
      },
      keyframes: {
        ripple: {
          to: {
            transform: "scale(4)",
            opacity: "0",
          },
        },
        "fade-in": {
          from: {
            transform: "scale(.8)",
            opacity: "0",
          },
          to: {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "fade-in-list": {
          from: {
            transform: "scaleY(.8)",
            opacity: "0",
          },
          to: {
            transform: "scaleY(1)",
            opacity: "1",
          },
        },
        "fade-out": {
          from: {
            transform: "scale(1)",
            opacity: "1",
          },
          to: {
            transform: "scale(.8)",
            opacity: "0",
          },
        },
        "fade-in-opacity": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        flash: {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
