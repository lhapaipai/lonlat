import Badge from "./Badge";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const onClickAction = action("onClick");
const onRemoveAction = action("onRemove");

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["yellow", "gray", "red", "orange", "green", "blue"],
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {
  args: {
    tooltip: "More infos...",
    url: "https://lonlat.org",
    color: "yellow",
    children: "Lonlat",
  },
};

export const Context = () => {
  return (
    <div className="flex flex-column gap-2">
      <Badge color="yellow">Primary</Badge>
      <Badge color="orange">Warning</Badge>
      <Badge color="green">Success</Badge>
      <Badge color="red">Danger</Badge>
      <Badge color="blue">Info</Badge>
      <Badge color="gray">Weak</Badge>
      <Badge color="yellow" onClick={onClickAction}>
        Primary clickable
      </Badge>
      <Badge color="orange" onClick={onClickAction}>
        Warning clickable
      </Badge>
      <Badge color="green" onClick={onClickAction}>
        Success clickable
      </Badge>
      <Badge color="red" onClick={onClickAction}>
        Danger clickable
      </Badge>
      <Badge color="blue" onClick={onClickAction}>
        Info clickable
      </Badge>
      <Badge color="gray" onClick={onClickAction}>
        Weak clickable
      </Badge>
      <Badge color="yellow" onRemove={onRemoveAction}>
        Primary removable
      </Badge>
      <Badge color="yellow" onClick={onClickAction} onRemove={onRemoveAction}>
        Primary clickable removable
      </Badge>

      <Badge color="yellow" tooltip="More infos...">
        With tooltip !
      </Badge>
    </div>
  );
};
