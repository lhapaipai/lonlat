import { Dispatch, SetStateAction, createContext } from "react";
import { NotificationProps, NotificationOptions } from "./interface";
import { FetchError } from "../..";

export function createNotificationsManager(
  setNotifications: Dispatch<SetStateAction<NotificationProps[]>>,
) {
  let idx = 1;
  const timeoutIds = new Map<number, any>();

  const removeNotification = (id: number) => {
    const timeoutId = timeoutIds.get(id);
    if (!timeoutId) {
      return;
    }
    clearTimeout(timeoutId);
    timeoutIds.delete(id);

    return setNotifications((oldNotifications) => {
      return oldNotifications.filter(({ id: otherId }) => id !== otherId);
    });
  };

  const addNotification = (
    message = "",
    {
      id = idx++,
      expiration = 5000,
      color = "primary",
      canClose = true,
      ...rest
    }: NotificationOptions = {},
  ) => {
    if (timeoutIds.has(id)) {
      throw new Error("notification already exists");
    }

    setNotifications((oldNotifications) => {
      const newNotification: NotificationProps = {
        id,
        expiration,
        message,
        color,
        canClose,
        ...rest,
      };

      return [newNotification, ...oldNotifications];
    });

    timeoutIds.set(
      id,
      expiration === -1 ? -1 : setTimeout(() => removeNotification(id), expiration),
    );

    return id;
  };

  const notifyError = (err: unknown) => {
    if (err instanceof FetchError) {
      addNotification(err.message);
    } else if (err instanceof Error) {
      addNotification(err.message, {
        color: "danger",
      });
    } else {
      throw err;
    }
  };

  return {
    addNotification,
    removeNotification,
    notifyError,
  };
}

export type NotificationsManager = ReturnType<typeof createNotificationsManager>;

export const NotificationsContext = createContext<NotificationsManager>(
  null as unknown as NotificationsManager,
);
