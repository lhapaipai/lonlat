import type { Config } from "tailwindcss";
import { pentatrionTw } from "pentatrion-design";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  theme: {},
  plugins: [pentatrionTw],
};
export default config;
