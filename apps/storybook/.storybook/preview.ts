import type { Preview } from "@storybook/react";
import '@lonlat/styles/_storybook.scss';

// https://storybook.js.org/docs/react/configure/overview#configure-story-rendering
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    }
  },
};

export default preview;
