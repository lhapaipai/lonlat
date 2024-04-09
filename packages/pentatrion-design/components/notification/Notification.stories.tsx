import { Notification, NotificationsProvider, useNotifications, Button } from "pentatrion-design";
import { Meta } from "@storybook/react";
import { useRef } from "react";
const meta = {
  title: "Components/Notification",
  component: Notification,
  decorators: [
    (Story) => (
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    ),
  ],
} satisfies Meta<typeof Notification>;
export default meta;

export const Basic = () => {
  return (
    <div className="ll-notifications-container">
      <div className="notifications">
        <Notification
          id={1}
          message="Hello world"
          expiration={-1}
          color="primary"
          canClose={true}
        />
        <Notification
          id={1}
          message="Basic notification"
          expiration={-1}
          color="primary"
          canClose={false}
          withLoader={true}
        />
      </div>
    </div>
  );
};

export const Context = () => {
  const counter = useRef(0);
  const { addNotification } = useNotifications();

  function handleClick() {
    counter.current += 1;
    addNotification(`Notification num. ${counter.current}`, {
      expiration: 5000,
    });
  }

  return (
    <>
      <Button onClick={handleClick}>show notif</Button>
    </>
  );
};
