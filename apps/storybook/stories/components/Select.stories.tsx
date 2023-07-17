import { Meta } from "@storybook/react";
import { Select, Option } from "@lonlat/shared";
const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = () => (
  <Select>
    <Option title="Foo" value="foo" />
    <Option title="Bar" value="bar" />
  </Select>
);
