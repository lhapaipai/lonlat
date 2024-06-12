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

    "./node_modules/pentatrion-design/components/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/hooks/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/redux/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    fontFamily: {
      sans: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
      fontello: ["fontello"],
      serif: defaultTheme.fontFamily.serif,
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      typography: pentatrionTypographyExtend,
    },
  },
  plugins: [pentatrionTw({}), typography],
};
export default config;