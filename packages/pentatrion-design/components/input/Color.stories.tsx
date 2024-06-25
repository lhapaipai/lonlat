import { Meta } from "@storybook/react";
import { Color } from "./Color";

const meta = {
  title: "Components/Input/Color",
  component: Color,
} satisfies Meta<typeof Color>;
export default meta;

export const Basic = () => {
  return (
    <div className="flex flex-col items-start gap-2">
      <Color value="#fecdba" />
      <Color value="#fecdba" label="300" />
      <Color value="#fecdba" showValue={true} />
    </div>
  );
};
