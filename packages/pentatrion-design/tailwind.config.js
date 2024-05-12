import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [`./components/**/*.{ts,tsx}`, `./hooks/**/*.{ts,tsx}`],
  darkMode: ["class"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      yellow: {
        1: "rgb(var(--color-yellow-1) / <alpha-value>)",
        2: "rgb(var(--color-yellow-2) / <alpha-value>)",
        3: "rgb(var(--color-yellow-3) / <alpha-value>)",
        4: "rgb(var(--color-yellow-4) / <alpha-value>)",
        5: "rgb(var(--color-yellow-5) / <alpha-value>)",
        // color of the text when bg is yellow
        text: "rgb(var(--color-yellow-text) / <alpha-value>)",
      },
      green: {
        1: "rgb(var(--color-green-1) / <alpha-value>)",
        2: "rgb(var(--color-green-2) / <alpha-value>)",
        3: "rgb(var(--color-green-3) / <alpha-value>)",
        4: "rgb(var(--color-green-4) / <alpha-value>)",
        5: "rgb(var(--color-green-5) / <alpha-value>)",
        // color of the text when bg is green
        text: "rgb(var(--color-green-text) / <alpha-value>)",
      },
      blue: {
        1: "rgb(var(--color-blue-1) / <alpha-value>)",
        2: "rgb(var(--color-blue-2) / <alpha-value>)",
        3: "rgb(var(--color-blue-3) / <alpha-value>)",
        4: "rgb(var(--color-blue-4) / <alpha-value>)",
        5: "rgb(var(--color-blue-5) / <alpha-value>)",
        // color of the text when bg is blue
        text: "rgb(var(--color-blue-text) / <alpha-value>)",
      },
      orange: {
        1: "rgb(var(--color-orange-1) / <alpha-value>)",
        2: "rgb(var(--color-orange-2) / <alpha-value>)",
        3: "rgb(var(--color-orange-3) / <alpha-value>)",
        4: "rgb(var(--color-orange-4) / <alpha-value>)",
        5: "rgb(var(--color-orange-5) / <alpha-value>)",
        // color of the text when bg is orange
        text: "rgb(var(--color-orange-text) / <alpha-value>)",
      },
      red: {
        1: "rgb(var(--color-red-1) / <alpha-value>)",
        2: "rgb(var(--color-red-2) / <alpha-value>)",
        3: "rgb(var(--color-red-3) / <alpha-value>)",
        4: "rgb(var(--color-red-4) / <alpha-value>)",
        5: "rgb(var(--color-red-5) / <alpha-value>)",
        // color of the text when bg is red
        text: "rgb(var(--color-red-text) / <alpha-value>)",
      },
      gray: {
        0: "rgb(var(--color-gray-0) / <alpha-value>)",
        1: "rgb(var(--color-gray-1) / <alpha-value>)",
        2: "rgb(var(--color-gray-2) / <alpha-value>)",
        3: "rgb(var(--color-gray-3) / <alpha-value>)",
        4: "rgb(var(--color-gray-4) / <alpha-value>)",
        5: "rgb(var(--color-gray-5) / <alpha-value>)",
        // color of the text when bg is gray
        text: "rgb(var(--color-gray-text) / <alpha-value>)",
      },

      text: {
        0: "rgb(var(--color-text-0) / <alpha-value>)",
        1: "rgb(var(--color-text-1) / <alpha-value>)",
        2: "rgb(var(--color-text-2) / <alpha-value>)",
        white: "rgb(var(--color-text-white) / <alpha-value>)",
      },
    },
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
  safelist: ["light", "dark"],
  plugins: [],
};
