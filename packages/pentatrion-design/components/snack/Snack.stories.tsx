import { Meta } from "@storybook/react";
import Snack from "./Snack";
const meta = {
  title: "Components/Snack",
  component: Snack,
} satisfies Meta<typeof Snack>;
export default meta;

export const Basic = () => {
  return (
    <div className="ll-notifications-container">
      <div className="notifications">
        <Snack id={"a"} content="Hello world" expiration={-1} color="yellow" canClose={true} />
        <Snack
          id={"b"}
          content="Basic notification"
          expiration={-1}
          color="yellow"
          canClose={false}
          withLoader={true}
        />
      </div>
    </div>
  );
};
