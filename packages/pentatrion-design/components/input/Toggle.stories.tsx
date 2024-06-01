import { Meta } from "@storybook/react";
import { useState } from "react";
import { Toggle } from ".";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;
export default meta;

export const Basic = () => (
  <div>
    <Toggle>I agree</Toggle>
    <Toggle color="gray">I agree</Toggle>
    <Toggle color="red">I agree</Toggle>
    <Toggle color="orange">I agree</Toggle>
    <Toggle color="green">I agree</Toggle>
    <Toggle color="blue">I agree</Toggle>
  </div>
);

export const Controlled = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Toggle checked={checked} onChange={(e) => setChecked(e.target.checked)}>
      Toggle value : {checked ? "True" : "False"}
    </Toggle>
  );
};
