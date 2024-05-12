import type { Preview } from "@storybook/react";
import "./storybook.scss";
import "../tailwind.css";
import "pentatrion-design/styles/default.scss";

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
