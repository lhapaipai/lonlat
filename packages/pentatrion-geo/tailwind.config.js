import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pentatrionTw } from "../pentatrion-design";

const storybookDir = dirname(fileURLToPath(new URL(import.meta.url)));
const projectDir = resolve(storybookDir, "../..");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `./components/**/*.{ts,tsx}`,
    `${projectDir}/packages/pentatrion-design/components/**/*.{ts,tsx}`,
    `${projectDir}/packages/pentatrion-design/hooks/**/*.{ts,tsx}`,
    `${projectDir}/packages/pentatrion-design/lib/**/*.{ts,tsx}`,
    `${projectDir}/packages/pentatrion-design/styles/**/*.{ts,tsx}`,
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [pentatrionTw],
};
