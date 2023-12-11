Remove `@storybook/addon-mdx-gfm`

The "@storybook/addon-mdx-gfm" addon is meant as a migration assistant for Storybook 7.0; and will likely be removed in a future version.

https://storybook.js.org/docs/writing-docs/mdx#lack-of-github-flavored-markdown-gfm

We turned off GFM features in MDX by default. GFM extends CommonMark to add autolink literals, footnotes, strikethrough, tables, and task lists. If you do want these features, you can use a plugin. How to do so is described in our guide on GFM.

```ts
import remarkGfm from 'remark-gfm';

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // Other addons go here
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
};

export default config;
```


## @storybook/addon-links

Semble en double donc retiré.

```diff
import type { StorybookConfig } from "@storybook/react-vite";

const projectDir = "../../.."
const sharedDir = `${projectDir}/extra/shared`

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
-  addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-essentials"],
+  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
```
