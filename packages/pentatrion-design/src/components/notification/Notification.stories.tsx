import { Meta, ReactRenderer } from "@storybook/react";
import { PartialStoryFn } from "@storybook/types";
import { useRef } from "react";
import NotificationsProvider from "./NotificationsProvider";
import { useFetch, useNotifications } from "~/hooks";
import { Button } from "../button";

const meta = {
  title: "Components/NotificationsProvider",
  component: NotificationsProvider,
  decorators: [
    (Story) => (
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    ),
  ] as ((story: PartialStoryFn<ReactRenderer, any>) => JSX.Element)[],
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
    <div className="grid grid-cols-1 gap-8">
      <Button onClick={handleClick}>Show info notification</Button>
      <Button onClick={throwError}>Throw custom error</Button>
      <Button onClick={handle404Error}>Throw 404 fetch error</Button>
    </div>
  );
};
