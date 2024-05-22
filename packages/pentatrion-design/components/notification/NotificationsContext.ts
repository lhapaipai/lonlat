import { Dispatch, SetStateAction, createContext } from "react";
import { Message, MessageOptions, parseError } from "~/lib";

export function createNotificationsManager(setNotifications: Dispatch<SetStateAction<Message[]>>) {
  let idx = 1;
  const timeoutIds = new Map<string, any>();

  const removeNotification = (id: string) => {
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
    content = "",
    {
      expiration = 5000,
      color = "yellow",
      canClose = true,
      withLoader = false,
    }: MessageOptions = {},
  ) => {
    const id = (idx++).toString();
    if (timeoutIds.has(id)) {
      throw new Error("notification already exists");
    }

    setNotifications((oldNotifications) => {
      const newNotification: Message = {
        id,
        content,
        expiration,
        color,
        canClose,
        withLoader,
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
    const errorMessage = parseError(err);
    if (errorMessage) {
      addNotification(...errorMessage);
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

export type { Message };
