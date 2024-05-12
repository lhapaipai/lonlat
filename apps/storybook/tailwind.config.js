import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const storybookDir = dirname(fileURLToPath(new URL(import.meta.url)));
const projectDir = resolve(storybookDir, "../..");

console.log("tailwind config", `${projectDir}/packages/pentatrion-design/components/**/*.{ts,tsx}`);

/** @type {import('tailwindcss').Config} */
export default {
  content: [`${projectDir}/packages/pentatrion-design/components/**/*.{ts,tsx}`],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [],
};
