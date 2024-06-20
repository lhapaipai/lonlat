import { Meta } from "@storybook/react";
import { useState } from "react";
import { RadioGroup } from ".";

const meta = {
  title: "Components/Input/RadioGroup",
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
    <div className="flex flex-col gap-4">
      <RadioGroup
        color="yellow"
        placement="inline"
        options={options}
        value={value}
        onChange={setValue}
      />
      <RadioGroup
        color="gray"
        placement="inline"
        options={options}
        value={value}
        onChange={setValue}
      />
      <RadioGroup
        color="red"
        placement="inline"
        options={options}
        value={value}
        onChange={setValue}
      />
      <RadioGroup
        color="orange"
        placement="inline"
        options={options}
        value={value}
        onChange={setValue}
      />
      <RadioGroup
        color="green"
        placement="inline"
        options={options}
        value={value}
        onChange={setValue}
      />
      <RadioGroup
        color="blue"
        placement="inline"
        options={options}
        value={value}
        onChange={setValue}
      />
      <RadioGroup
        placement="inline-grid"
        options={options}
        value={value}
        onChange={setValue}
      />
      <RadioGroup options={options} value={value} onChange={setValue} />
    </div>
  );
};
