import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeading,
  PopoverDescription,
  PopoverClose,
} from "@lonlat/shared";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ children, ...args }) => (
    <Popover {...args}>
      <PopoverTrigger>My trigger</PopoverTrigger>
      <PopoverContent>
        <PopoverHeading>Heading</PopoverHeading>
        <PopoverDescription>description</PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
  args: {
    initialOpen: false,
    placement: "bottom",
    type: "default",
    modal: false,
    children: "",
  },
};

export const Context = () => (
  <Popover type="primary">
    <PopoverTrigger>My trigger</PopoverTrigger>
    <PopoverContent>
      <PopoverHeading>Heading</PopoverHeading>
      <PopoverDescription>description</PopoverDescription>
      <PopoverClose>Close</PopoverClose>
    </PopoverContent>
  </Popover>
);
