import { Checkbox } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    disabled: false,
    children: "I agree",
    indeterminate: false,
  },
};

export const Controlled = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
      Checkbox value : {checked ? "True" : "False"}
    </Checkbox>
  );
};

export const WithIndeterminate = () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  function handleChange() {
    if (checked && !indeterminate) {
      setIndeterminate(true);
      setChecked(false);
    } else if (!checked && indeterminate) {
      setIndeterminate(false);
    } else {
      setChecked((checked) => !checked);
    }
  }

  return (
    <Checkbox checked={checked} indeterminate={indeterminate} onChange={handleChange}>
      Checkbox value : {checked ? "True" : "False"}, Indeterminate value :{" "}
      {indeterminate ? "True" : "False"}
    </Checkbox>
  );
};
