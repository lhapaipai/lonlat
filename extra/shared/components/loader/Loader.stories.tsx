import { Loader } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {
  args: {
    size: "medium",
    type: "primary",
  },
};

export const Context = () => (
  <div className="flex gap-2 flex-column">
    <Loader size="small" />
    <br />
    <Loader size="medium" type="primary" />
    <br />
    <Loader size="large" type="danger" />
  </div>
);
