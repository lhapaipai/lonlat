import { Input, Button } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";
import { ChangeEvent, useState } from "react";

const meta = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    prefix: {
      control: "text",
    },
    suffix: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {
  args: {
    disabled: false,
    prefix: "",
    suffix: "",
  },
};

export const Context = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex gap-2 flex-column">
      <Input />
      <Input placeholder="Your first name" />
      <Input prefix={<i className="fe-search"></i>} />
      <Input prefix={<span>prefix</span>} />
      <Input suffix={<span>suffix</span>} />
      <Input
        type="number"
        value={counter}
        onChange={(e) => {
          e.target.validity.valid && setCounter(e.target.valueAsNumber);
        }}
      />
      <div className="flex gap-2 ">
        <Input />
        <Button>Valider</Button>
      </div>
    </div>
  );
};
