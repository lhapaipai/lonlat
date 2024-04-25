import { RadioGroup } from "~design";
import { Meta } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;
export default meta;

const options = [
  {
    label: "Climbing",
    value: "climbing",
  },
  {
    label: "Tennis",
    value: "tennis",
  },
  {
    label: "Soccer",
    value: "soccer",
  },
];

export const Basic = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div className="flex flex-column gap-4">
      <RadioGroup placement="inline" options={options} value={value} onChange={setValue} />
      <RadioGroup placement="inline-grid" options={options} value={value} onChange={setValue} />
      <RadioGroup options={options} value={value} onChange={setValue} />
    </div>
  );
};
