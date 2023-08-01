import { RMarker, RMap } from "@lonlat/maplibre-react";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LngLatLike } from "maplibre-gl";
import { action } from "@storybook/addon-actions";

const onChangeLngLatAction = action("onChangeLngLatAction");

const meta = {
  title: "Maplibre-React/RMarker",
  component: RMarker,
  decorators: [
    (Story) => (
      <RMap style={{ height: "var(--storybook-preview-viewport-height)" }}>
        <Story />
      </RMap>
    ),
  ],
} satisfies Meta<typeof RMarker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    lnglat: [5, 45],
    color: "green",
    draggable: false,
    scale: 1,
  },
  argTypes: {
    color: {
      control: {
        type: "color",
        presetColors: ["#ffe64b", "#9ed24d", "#5fbcff", "#ffa33d", "#ff4d4d", "#c0c0c0"],
      },
    },
    scale: {
      control: {
        type: "range",
        min: 0.1,
        max: 2,
        step: 0.1,
      },
    },
  },
};

export const Draggable = () => {
  const [coords, setCoords] = useState<LngLatLike>([5, 45]);
  function handleChangeLngLat(e?: LngLatLike) {
    onChangeLngLatAction(e);
    e && setCoords(e);
  }
  return <RMarker draggable={true} lnglat={coords} onChangeLngLat={handleChangeLngLat}></RMarker>;
};
