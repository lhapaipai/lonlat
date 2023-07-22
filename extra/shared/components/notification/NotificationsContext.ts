import { Dispatch, SetStateAction, createContext } from "react";
import { NotificationProps, NotificationOptions } from "./interface";

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
      type = "primary",
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
        type,
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

  return {
    addNotification,
    removeNotification,
  };
}

export type NotificationsManager = ReturnType<typeof createNotificationsManager>;

export const NotificationsContext = createContext<NotificationsManager>(
  null as unknown as NotificationsManager,
);
