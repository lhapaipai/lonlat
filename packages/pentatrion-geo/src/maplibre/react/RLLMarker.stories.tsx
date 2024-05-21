import { Event, RMap } from "maplibre-react-components";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
// import { action } from "@storybook/addon-actions";
import "maplibre-gl/dist/maplibre-gl.css";
import RLLMarker from "./RLLMarker";
import LLMarker from "../LLMarker";

// const onChangeLngLatAction = action("onChangeLngLatAction");

// @ts-ignore issue with memoized RLLMarker
const meta = {
  title: "pentatrion-geo/RLLMarker",
  component: RLLMarker,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    rotation: {
      control: {
        type: "range",
        min: 0,
        max: 360,
      },
    },
    rotationAlignment: {
      control: {
        type: "select",
      },
      options: ["map", "viewport", "auto"],
    },
    pitchAlignment: {
      control: {
        type: "select",
      },
      options: ["map", "viewport", "auto"],
    },
    clickTolerance: {
      control: {
        type: "number",
        min: 0,
        max: 100,
      },
      description: "nb of pixels to move before drag start",
    },
    opacity: {
      control: {
        type: "select",
      },
      options: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
    },
    opacityWhenCovered: {
      control: {
        type: "select",
      },
      options: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
    },
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

  decorators: [
    (Story) => (
      <RMap style={{ height: "100vh" }}>
        <Story />
      </RMap>
    ),
  ],
} satisfies Meta<typeof RLLMarker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: "",
    draggable: false,
    clickTolerance: 0,
    rotation: 0,
    rotationAlignment: "auto",
    pitchAlignment: "auto",
    opacity: "1", // type string to be compatible with elt.style.opacity
    opacityWhenCovered: "0.2",
    longitude: 5,
    latitude: 45,
    color: "green",
    scale: 1,
    icon: "fe-star",
  },
};

export const Draggable = () => {
  const [coords, setCoords] = useState({ lng: 5, lat: 45 });
  function handleDragEnd(e: Event<LLMarker>) {
    console.log("on DragEnd");
    setCoords(e.target.getLngLat());
  }
  return (
    <RLLMarker
      draggable={true}
      longitude={coords.lng}
      latitude={coords.lat}
      onDragEnd={handleDragEnd}
    ></RLLMarker>
  );
};
