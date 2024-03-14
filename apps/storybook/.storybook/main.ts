import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const storybookDir = resolve(fileURLToPath(new URL('..', import.meta.url)));
const projectDir = resolve(storybookDir, '../..');

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(ts|tsx)",
    `${projectDir}/packages/pentatrion-design/styles/**/*.stories.@(ts|tsx)`,
    `${projectDir}/packages/pentatrion-design/components/**/*.stories.@(ts|tsx)`,
    `${projectDir}/packages/pentatrion-fonts/Icons.stories.tsx`,
    `${projectDir}/packages/maplibre-components/src/**/*.stories.@(ts|tsx)`,
    `${projectDir}/packages/react-maplibre-components/src/**/*.stories.@(ts|tsx)`,
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",

    // is it necessary ?
    "@storybook/addon-actions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs: ['../public']
};
export default config;
