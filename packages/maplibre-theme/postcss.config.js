import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import postcssInlineSvg from "postcss-inline-svg";
import postcssImport from "postcss-import";

const config = {
  plugins: [
    postcssImport(),
    autoprefixer(),
    postcssInlineSvg(),
    cssnanoPlugin({
      preset: [
        "default",
        {
          svgo: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      ],
    }),
  ],
};

export default config;
