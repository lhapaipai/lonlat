import { Meta } from "@storybook/react";
import ResizeArea from "./ResizeArea";
import "./ResizeArea.stories.scss";

const meta = {
  title: "Components/ResizeArea",
  component: ResizeArea,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ResizeArea>;
export default meta;

export const Basic = () => {
  return (
    <div id="app">
      <div id="principal">
        <div id="menu-col">
          <ResizeArea name="menu" position="right" />
          <div>Menu</div>
        </div>
        <div id="content">Content</div>
      </div>
      <div id="extra-row">
        <ResizeArea name="extra" position="top" />
        <div>Extra row</div>
      </div>
    </div>
  );
};
