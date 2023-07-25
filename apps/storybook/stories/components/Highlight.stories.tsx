import { Highlight } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Highlight",
  component: Highlight,
} satisfies Meta<typeof Highlight>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = () => {
  const zones = [
    {
      extract: "route de ",
      highlighted: false,
    },
    {
      extract: "Bonnev",
      highlighted: true,
    },
    {
      extract: "ille",
      highlighted: false,
    },
  ];
  return <Highlight fallback="route de Bonneville" zones={zones} />;
};
