import { Toggle } from "~design";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    disabled: false,
    children: "I agree",
  },
};

export const Controlled = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Toggle checked={checked} onChange={(e) => setChecked(e.target.checked)}>
      Toggle value : {checked ? "True" : "False"}
    </Toggle>
  );
};
