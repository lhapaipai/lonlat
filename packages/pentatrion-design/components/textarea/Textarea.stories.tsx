import { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {};

export const Context = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      <Textarea className="h-24 w-96" color="yellow" />
      <Textarea className="h-24 w-96" color="gray" />
      <Textarea className="h-24 w-96" color="green" />
      <Textarea className="h-24 w-96" color="red" />
      <Textarea className="h-24 w-96" color="orange" />
      <Textarea className="h-24 w-96" color="blue" />
      <Textarea className="h-24 w-96" disabled value="disabled" />
    </div>
  );
};
