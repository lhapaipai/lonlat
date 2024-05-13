import { Meta } from "@storybook/react";
import { cardConfig } from "./config";

const meta = {
  title: "Components/Card",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return <div className={cardConfig.item}>Hello world</div>;
};

export const Multiple = () => {
  return (
    <div className={cardConfig.group}>
      <div className={cardConfig.item}>Card 1</div>
      <div className={cardConfig.item}>Card 2</div>
      <div className={cardConfig.item}>Card 3</div>
    </div>
  );
};
