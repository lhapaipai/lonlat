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
  staticDirs: ['../public'],
  viteFinal(config) {
    const finalConfig = mergeConfig(config, {
      build: {
        chunkSizeWarningLimit: 2000
      },
      resolve: {
        alias: {
          "pentatrion-design": resolve(projectDir, 'packages/pentatrion-design'),
          "react-maplibre-components": resolve(projectDir, 'packages/react-maplibre-components'),
          "maplibre-components": resolve(projectDir, 'packages/maplibre-components'),
          "@storybook/react": resolve(storybookDir, 'node_modules/@storybook/react'),
          "@storybook/addon-actions": resolve(storybookDir, 'node_modules/@storybook/addon-actions'),
        }
      }
    })
    return finalConfig
  }
};
export default config;
