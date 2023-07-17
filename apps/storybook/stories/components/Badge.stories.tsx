import { Badge } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";

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

export const Context = () => (
  <div className="flex flex-column gap-2">
    <Badge type="primary">Primary</Badge>
    <Badge type="warning">Warning</Badge>
    <Badge type="success">Success</Badge>
    <Badge type="danger">Danger</Badge>
    <Badge type="info">Info</Badge>
    <Badge type="weak">Weak</Badge>
    <Badge type="primary" url="https://lonlat.org">
      Primary
    </Badge>
    <Badge type="warning" url="https://lonlat.org">
      Warning
    </Badge>
    <Badge type="success" url="https://lonlat.org">
      Success
    </Badge>
    <Badge type="danger" url="https://lonlat.org">
      Danger
    </Badge>
    <Badge type="info" url="https://lonlat.org">
      Info
    </Badge>
    <Badge type="weak" url="https://lonlat.org">
      Weak
    </Badge>
    <Badge type="primary" tooltip="More infos...">
      With tooltip !
    </Badge>
  </div>
);
