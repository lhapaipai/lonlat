import { RMap, RPopup } from "@lonlat/maplibre-react";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Maplibre-React/RPopup",
  component: RPopup,
  decorators: [
    (Story) => (
      <RMap style={{ height: "var(--storybook-preview-viewport-height)" }}>
        <Story />
      </RMap>
    ),
  ],
} satisfies Meta<typeof RPopup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    lnglat: [5, 45],
    html: '<div class="description">Hello world</div>',
    closeButton: true,
    closeOnClick: true,
    closeOnMove: false,
    focusAfterOpen: true,
    anchor: "bottom",
    maxWidth: "240px",
  },
  argTypes: {
    anchor: {
      control: "select",
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "center",
      ],
    },
  },
};
