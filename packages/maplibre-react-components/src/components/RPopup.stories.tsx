import { Meta, StoryObj } from "@storybook/react";
import { RMap } from "..";
import RPopup from "./RPopup";

const meta = {
  title: "maplibre-react-components/RPopup",
  component: RPopup,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <RMap style={{ height: "100vh" }}>
          <Story />
        </RMap>
      );
    },
  ],
} satisfies Meta<typeof RPopup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <p>Hello world</p>,
    longitude: 5,
    latitude: 45,
    className: "",
    offset: 10,
    maxWidth: "240px",
    initialCloseButton: false,
    initialCloseOnClick: false,
    initialCloseOnMove: false,
    initialFocusAfterOpen: false,
    initialAnchor: "center",
    initialSubpixelPositioning: false,
  },
  argTypes: {
    initialAnchor: {
      control: {
        type: "select",
      },
      options: [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
    },
  },
};
