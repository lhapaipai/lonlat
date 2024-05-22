import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button";
import Input from "./Input";
import Loader from "../loader/Loader";

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
    <div className="flex gap-2 flex-col">
      <Input />
      <Input color="gray" />
      <Input color="red" />
      <Input color="orange" />
      <Input color="green" />
      <Input color="blue" />
      <Input variant="ghost" />
      <Input color="gray" variant="ghost" />
      <Input color="blue" variant="ghost" />

      <Input placeholder="Your first name" />
      <Input
        prefix={
          <span className="w-8 h-8 flex-center">
            <i className="fe-search"></i>
          </span>
        }
      />
      <Input
        prefix={
          <>
            <Loader size="medium" color="gray" />
            <span className="w-8 h-8 flex-center -ml-8">
              <i className="fe-search"></i>
            </span>
          </>
        }
      />
      <Input
        suffix={
          <Button withRipple={false} icon variant="ghost" color="gray">
            <i className="fe-cancel"></i>
          </Button>
        }
      />
      <Input
        suffix={
          <>
            <Button withRipple={false} icon variant="ghost" color="gray">
              <i className="fe-cancel"></i>
            </Button>
            <Loader size="medium" color="gray" />
          </>
        }
      />
      <Input
        suffix={
          <>
            <Loader size="medium" color="gray" />
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
        <Input className="flex-1" />
        <Button>Valider</Button>
      </div>
    </div>
  );
};
