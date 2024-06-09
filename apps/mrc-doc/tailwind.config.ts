import type { Config } from "tailwindcss";
import { pentatrionTw, pentatrionTypographyExtend } from "pentatrion-design/tailwind";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/pentatrion-design/components/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/hooks/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/redux/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: pentatrionTypographyExtend,
    },
  },
  plugins: [pentatrionTw, typography],
};
export default config;
