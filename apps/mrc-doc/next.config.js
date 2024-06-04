import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["mdx", "ts", "tsx"],
  // reactStrictMode: false,
  webpack(config, options) {
    config.resolve.alias["next-mdx-import-source-file"] = [
      "private-next-root-dir/src/mdx-components",
      "@mdx-js/react",
    ];
    /** @type {import('rehype-pretty-code').Options} */
    const rehypePluginsOptions = {
      theme: "github-light-default",
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
            rehypePlugins: [[rehypePrettyCode, rehypePluginsOptions]],
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
