import { NotificationsProvider, useNotifications, Button, useFetch } from "pentatrion-design";
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

export const WithErrors = () => {
  const { notifyError } = useNotifications();

  function throwError() {
    try {
      throw new Error("Erreur type Error.");
    } catch (e) {
      notifyError(e);
    }
  }

  return (
    <>
      <Button onClick={throwError}>lève une erreur</Button>
    </>
  );
};

export const WithFetchErrors = () => {
  const fetch = useFetch();
  function handle404Error() {
    fetch("/throw-404-error");
  }

  return (
    <>
      <Button onClick={handle404Error}>throw 404 error</Button>
    </>
  );
};
