import postcssImport from "postcss-import";

/** @type {import("postcss-load-config").Config} */
export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
  },
};
