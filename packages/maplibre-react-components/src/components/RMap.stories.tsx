import { RMap } from "maplibre-react-components";
import { Meta, StoryObj } from "@storybook/react";
import "maplibre-gl/dist/maplibre-gl.css";

const meta = {
  title: "maplibre-react-components/RMap",
  component: RMap,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof RMap>;
export default meta;

type Story = StoryObj<typeof meta>;

const marignier = [6.498, 46.089] as [number, number];

export const Basic: Story = {
  args: {
    initialCenter: marignier,
    initialZoom: 4,
  },
};