import { Input, Button, Loader } from "pentatrion-design";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

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
      <Input
        prefix={
          <>
            <i className="fe-search"></i>
            <Loader size="medium" color="weak" />
          </>
        }
      />
      <Input
        suffix={
          <Button withRipple={false} icon shape="underline">
            <i className="fe-cancel"></i>
          </Button>
        }
      />
      <Input
        suffix={
          <>
            <Button withRipple={false} icon shape="underline">
              <i className="fe-cancel"></i>
            </Button>
            <Loader size="medium" color="weak" />
          </>
        }
      />
      <Input
        suffix={
          <>
            <Loader size="medium" color="weak" />
          </>
        }
      />
      <Input prefix="prefix" />
      <Input suffix="suffix" />
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
