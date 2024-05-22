import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type {} from "@storybook/types";

const projectDir = resolve(fileURLToPath(new URL("..", import.meta.url)));

const config: StorybookConfig = {
  stories: [
    `${projectDir}/src/styles/**/*.stories.@(ts|tsx)`,
    `${projectDir}/src/components/**/*.stories.@(ts|tsx)`,
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["./public"],
};
export default config;
