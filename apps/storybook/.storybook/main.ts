import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-mdx-gfm"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs: ['../public']
};
export default config;
