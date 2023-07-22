import { Badge } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const onClickAction = action("onClick");
const onRemoveAction = action("onRemove");

const meta = {
  title: "Components/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    tooltip: "More infos...",
    url: "https://lonlat.org",
    type: "primary",
    children: "Lonlat",
  },
};

export const Context = () => {
  return (
    <div className="flex flex-column gap-2">
      <Badge type="primary">Primary</Badge>
      <Badge type="warning">Warning</Badge>
      <Badge type="success">Success</Badge>
      <Badge type="danger">Danger</Badge>
      <Badge type="info">Info</Badge>
      <Badge type="weak">Weak</Badge>
      <Badge type="primary" onClick={onClickAction}>
        Primary clickable
      </Badge>
      <Badge type="warning" onClick={onClickAction}>
        Warning clickable
      </Badge>
      <Badge type="success" onClick={onClickAction}>
        Success clickable
      </Badge>
      <Badge type="danger" onClick={onClickAction}>
        Danger clickable
      </Badge>
      <Badge type="info" onClick={onClickAction}>
        Info clickable
      </Badge>
      <Badge type="weak" onClick={onClickAction}>
        Weak clickable
      </Badge>
      <Badge type="primary" onRemove={onRemoveAction}>
        Primary removable
      </Badge>
      <Badge type="primary" onClick={onClickAction} onRemove={onRemoveAction}>
        Primary clickable removable
      </Badge>

      <Badge type="primary" tooltip="More infos...">
        With tooltip !
      </Badge>
    </div>
  );
};
