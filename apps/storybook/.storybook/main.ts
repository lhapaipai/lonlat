import type { StorybookConfig } from "@storybook/react-vite";

const projectDir = "../../.."
const sharedDir = `${projectDir}/extra/shared`

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
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
