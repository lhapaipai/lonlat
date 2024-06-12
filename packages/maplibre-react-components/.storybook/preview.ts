import type { Preview } from "@storybook/react";
import "./storybook.css";
import "../dist/style.css";
import "./base.css";

// https://storybook.js.org/docs/react/configure/overview#configure-story-rendering
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
