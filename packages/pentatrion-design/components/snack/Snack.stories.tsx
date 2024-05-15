import { Meta } from "@storybook/react";
import Snack from "./Snack";
const meta = {
  title: "Components/Snack",
  component: Snack,
} satisfies Meta<typeof Snack>;
export default meta;

export const Basic = () => {
  return (
    <div className="ll-snack-bar fixed bottom-0 left-0 right-0 z-notification">
      <div className="snack-bar-inner mb-4 mx-4 flex flex-col gap-4 items-center">
        <Snack id={"a"} content="Hello world" expiration={-1} color="yellow" canClose={true} />
        <Snack
          id={"b"}
          content="Basic notification"
          expiration={-1}
          color="yellow"
          canClose={false}
          withLoader={true}
        />
        <Snack id={"c"} content="Error message" expiration={-1} color="red" />
        <Snack id={"c"} content="Warning message" expiration={-1} color="orange" />
        <Snack
          id={"c"}
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium fuga totam facilis veritatis eaque ea ad laboriosam debitis accusantium, quos placeat magni architecto enim tempore, unde quae! Unde, voluptatum sint?"
          expiration={-1}
          color="blue"
        />
      </div>
    </div>
  );
};
