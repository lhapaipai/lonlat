import {
  pentatrionTw,
  pentatrionTypographyExtend,
} from "pentatrion-design/tailwind";
import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/pentatrion-design/lib/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/components/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/hooks/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/redux/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      title: ["var(--font-alata)", "ui-sans-serif", "system-ui", "sans-serif"],
      fontello: ["fontello"],
      serif: defaultTheme.fontFamily.serif,
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: [
            pentatrionTypographyExtend.DEFAULT.css,
            {
              code: {
                color: "rgb(var(--color-gray-text))",
                backgroundColor: "rgb(var(--color-gray-1))",
                borderRadius: "3px",
                padding: "3px 6px 0px",
              },
              "code::before": {
                content: "none",
              },
              "code::after": {
                content: "none",
              },
            },
          ],
        },
      },
    },
  },
  plugins: [
    pentatrionTw({
      base: false,
    }),
    typography,
  ],
};
export default config;
