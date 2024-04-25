import { Loader } from "~design";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Loader",
  component: Loader,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["primary", "weak", "danger", "warning", "success", "info"],
    },
  },
} satisfies Meta<typeof Loader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {
  args: {
    size: "medium",
    color: "primary",
  },
};

export const Context = () => (
  <div className="flex gap-2 flex-column">
    <Loader size="small" />
    <br />
    <Loader size="medium" color="primary" />
    <br />
    <Loader size="large" color="danger" />
    <br />
    <Loader size="medium" color="weak" />
  </div>
);
