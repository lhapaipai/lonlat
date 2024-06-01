import { Meta } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from ".";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;
export default meta;

export const Basic = () => (
  <div>
    <Checkbox>I agree</Checkbox>
    <Checkbox color="gray">I agree</Checkbox>
    <Checkbox color="red">I agree</Checkbox>
    <Checkbox color="orange">I agree</Checkbox>
    <Checkbox color="blue">I agree</Checkbox>
    <Checkbox color="green">I agree</Checkbox>
  </div>
);

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
