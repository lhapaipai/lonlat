import { useContext } from "react";

import { NotificationsContext } from "../components/notification/NotificationsContext";

const useNotifications = () => {
  const manager = useContext(NotificationsContext);

  if (!manager) {
    throw new Error("Trying to use uninitialized NotificationsContext");
  }

  return manager;
};

export default useNotifications;
