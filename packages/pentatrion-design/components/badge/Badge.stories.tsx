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
      options: ["primary", "weak", "danger", "warning", "success", "info"],
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playbook: Story = {
  args: {
    tooltip: "More infos...",
    url: "https://lonlat.org",
    color: "primary",
    children: "Lonlat",
  },
};

export const Context = () => {
  return (
    <div className="flex flex-column gap-2">
      <Badge color="primary">Primary</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="weak">Weak</Badge>
      <Badge color="primary" onClick={onClickAction}>
        Primary clickable
      </Badge>
      <Badge color="warning" onClick={onClickAction}>
        Warning clickable
      </Badge>
      <Badge color="success" onClick={onClickAction}>
        Success clickable
      </Badge>
      <Badge color="danger" onClick={onClickAction}>
        Danger clickable
      </Badge>
      <Badge color="info" onClick={onClickAction}>
        Info clickable
      </Badge>
      <Badge color="weak" onClick={onClickAction}>
        Weak clickable
      </Badge>
      <Badge color="primary" onRemove={onRemoveAction}>
        Primary removable
      </Badge>
      <Badge color="primary" onClick={onClickAction} onRemove={onRemoveAction}>
        Primary clickable removable
      </Badge>

      <Badge color="primary" tooltip="More infos...">
        With tooltip !
      </Badge>
    </div>
  );
};
