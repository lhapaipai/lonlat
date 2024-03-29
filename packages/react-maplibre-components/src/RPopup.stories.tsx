import { RMap, RPopup } from "react-maplibre-components";
import { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";

const meta = {
  title: "Maplibre-React/RPopup",
  component: RPopup,
  decorators: [
    (Story) => {
      if (document.body.classList.contains("sb-main-padded")) {
        document.body.classList.remove("sb-main-padded");
      }

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
    lnglat: [5, 45],
    html: "Hello world",
    closeButton: true,
    closeOnClick: true,
    closeOnMove: false,
    placement: "top",
    maxWidth: "240px",
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
    },
  },
};
