import { useContext } from "react";

import { NotificationsContext } from "./NotificationsContext";

export const useContextNotifications = () => {
  const manager = useContext(NotificationsContext);

  if (!manager) {
    throw new Error("Trying to use uninitialized NotificationsContext");
  }

  return manager;
};
