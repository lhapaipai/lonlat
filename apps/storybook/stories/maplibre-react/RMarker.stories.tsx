import { RMarker, RMap } from "@lonlat/maplibre-react";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import * as maplibre from "maplibre-gl";

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
  },
};

export const Context = () => {
  const [coords, setCoords] = useState<maplibre.LngLatLike>([5, 45]);
  return <RMarker lnglat={coords}></RMarker>;
};
