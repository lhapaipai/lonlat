import { Notification, NotificationsProvider, useNotifications, Button } from "@lonlat/shared";
import { Meta } from "@storybook/react";
import { useState } from "react";
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
    <div className="flex flex-column gap-2">
      <Notification id={1} message="Hello world" expiration={-1} type="primary" canClose={true} />
      <Notification
        id={1}
        message="Basic notification"
        expiration={-1}
        type="primary"
        canClose={false}
        withLoader={true}
      />
    </div>
  );
};

export const Context = () => {
  const [counter, setCounter] = useState(0);
  const { addNotification } = useNotifications();

  function handleClick() {
    const nextVal = counter + 1;
    addNotification(`Notification num. ${nextVal}`, {
      expiration: 5000,
    });
    setCounter(nextVal);
  }

  return (
    <>
      <Button onClick={handleClick}>show notif</Button>
    </>
  );
};
