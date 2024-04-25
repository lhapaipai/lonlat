import { Popover, PopoverContent, PopoverTrigger } from "~design";
import { PopoverHeader, PopoverDescription } from "~design/components/popover/Components";
import { Meta, StoryObj } from "@storybook/react";

/**
 *
 */

const meta = {
  title: "Components/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ children, ...args }) => (
    <>
      <p>
        Contrairement au tooltip il doit s'activer par un clic. le Popover est masqué si
        l'utilisateur clique autre part
      </p>
      <Popover {...args}>
        <PopoverTrigger>My trigger</PopoverTrigger>
        <PopoverContent style={{ width: "400px" }}>
          <PopoverHeader>Heading</PopoverHeader>
          <PopoverDescription>description</PopoverDescription>
        </PopoverContent>
      </Popover>
    </>
  ),
  args: {
    initialOpen: false,
    placement: "bottom",
    color: "default",
    modal: false,
    children: "",
  },
};

export const Context = () => (
  <Popover color="primary">
    <PopoverTrigger>My trigger</PopoverTrigger>
    <PopoverContent style={{ width: "400px" }}>
      <PopoverHeader>Heading</PopoverHeader>
      <PopoverDescription>description</PopoverDescription>
    </PopoverContent>
  </Popover>
);
