import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const storybookDir = resolve(fileURLToPath(new URL('..', import.meta.url)));
const projectDir = resolve(storybookDir, '../..');

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(ts|tsx)",
    `${projectDir}/extra/shared/styles/**/*.stories.@(ts|tsx)`,
    `${projectDir}/extra/fonts/Icons.stories.tsx`,
    `${projectDir}/extra/shared/components/**/*.stories.@(ts|tsx)`,
    `${projectDir}/extra/maplibre-ext/src/**/*.stories.@(ts|tsx)`,
    `${projectDir}/extra/maplibre-react/src/**/*.stories.@(ts|tsx)`,
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
          "@lonlat/shared": resolve(projectDir, 'extra/shared'),
          "@lonlat/maplibre-react": resolve(projectDir, 'extra/maplibre-react'),
          "@lonlat/maplibre-ext": resolve(projectDir, 'extra/maplibre-ext'),
          "@storybook/react": resolve(storybookDir, 'node_modules/@storybook/react'),
          "@storybook/addon-actions": resolve(storybookDir, 'node_modules/@storybook/addon-actions'),
        }
      }
    })
    return finalConfig
  }
};
export default config;
