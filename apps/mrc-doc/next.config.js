import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
const projectDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["mdx", "ts", "tsx"],
  // reactStrictMode: false,
  webpack(config, options) {
    config.resolve.alias["next-mdx-import-source-file"] = [
      "private-next-root-dir/src/components/Mdx",
      "@mdx-js/react",
    ];

    /** @type {import('rehype-pretty-code').Options} */
    const rehypePrettyCodeOptions = {
      // theme is singular (not themes) from shiki default config
      theme: {
        // same as apps/mrc-doc/webpack/shikiLoader.js
        light: "github-light-default",
        dark: "github-dark-default",
      },
    };

    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            providerImportSource: "next-mdx-import-source-file",
            remarkPlugins: [],
            rehypePlugins: [
              [rehypePrettyCode, rehypePrettyCodeOptions],
              rehypeSlug,
            ],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.tsx$/,
      resourceQuery: /shiki/,
      use: [
        {
          loader: resolve(projectDir, "webpack/shikiLoader.js"),
        },
      ],
    });

    return config;
  },

  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
