import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import prefixer from "postcss-prefix-selector";
import postcssInlineSvg from "postcss-inline-svg";
import postcssImport from "postcss-import";
import postcssInlineBase64 from "postcss-inline-base64";
import { dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
const projectDir = dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: [
    postcssImport(),
    prefixer({
      prefix: "",
      transform(prefix, selector, prefixedSelector, filePath, rule) {
        const entryName = basename(filePath, ".css");
        const themeClassName = `.ml-theme-${entryName}`;

        if (entryName === "core" || selector.includes(themeClassName)) {
          return selector;
        }
        /* todo difference avec ":root,\n .dark" */
        if (selector === ":root") {
          return themeClassName;
        }
        if (selector === ".dark") {
          return `.dark ${themeClassName}`;
        }

        if (selector.startsWith(".maplibregl-map")) {
          return `${themeClassName}${selector}`;
        }

        return `${themeClassName} ${selector}`;
      },
    }),
    postcssInlineBase64({
      baseDir: projectDir,
    }),
    autoprefixer(),
    postcssInlineSvg(),
    // cssnanoPlugin({
    //   preset: [
    //     "default",
    //     {
    //       svgo: {
    //         plugins: [
    //           {
    //             name: "preset-default",
    //             params: {
    //               overrides: {
    //                 removeViewBox: false,
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // }),
  ],
};

export default config;
