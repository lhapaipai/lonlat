import { NotificationsProvider, useNotifications, Button, useFetch } from "~design";
import { Meta } from "@storybook/react";
import { useRef } from "react";
const meta = {
  title: "Components/NotificationsProvider",
  component: NotificationsProvider,
  decorators: [
    (Story) => (
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    ),
  ],
} satisfies Meta<typeof NotificationsProvider>;
export default meta;

export const Context = () => {
  const counter = useRef(0);
  const { addNotification, notifyError } = useNotifications();
  const fetch = useFetch();
  function handleClick() {
    counter.current += 1;
    addNotification(`Notification num. ${counter.current}`, {
      expiration: 5000,
    });
  }

  function throwError() {
    try {
      throw new Error("Custom error message");
    } catch (e) {
      notifyError(e);
    }
  }

  function handle404Error() {
    fetch("/throw-404-error");
  }

  return (
    <div className="storybook-gap">
      <Button onClick={handleClick}>Show info notification</Button>
      <Button onClick={throwError}>Throw custom error</Button>
      <Button onClick={handle404Error}>Throw 404 fetch error</Button>
    </div>
  );
};
