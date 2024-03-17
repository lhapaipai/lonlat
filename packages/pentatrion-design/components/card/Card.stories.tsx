import { Meta } from "@storybook/react";

const meta = {
  title: "Components/Card",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return <div className="ll-card">Hello world</div>;
};

export const Multiple = () => {
  return (
    <div className="ll-card-group">
      <div className="ll-card">Card 1</div>
      <div className="ll-card">Card 2</div>
      <div className="ll-card">Card 3</div>
    </div>
  );
};
