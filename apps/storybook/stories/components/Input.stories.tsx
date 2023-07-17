import { Input, Button } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";

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

export const Basic: Story = {
  args: {
    disabled: false,
    prefix: "",
    suffix: "",
  },
};

export const Context = () => (
  <div className="flex gap-2 flex-column">
    <Input />
    <Input placeholder="Your first name" />
    <Input prefix={<span>prefix</span>} />
    <Input suffix={<span>suffix</span>} />
    <div className="flex gap-2 ">
      <Input />
      <Button>Valider</Button>
    </div>
  </div>
);
