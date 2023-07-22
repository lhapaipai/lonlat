import { ReactNode, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  NotificationsContext,
  createNotificationsManager,
  type NotificationsManager,
} from "./NotificationsContext";
import { Notification } from ".";
import { NotificationProps } from "./interface";

interface Props {
  children: ReactNode;
}

export default function NotificationsContainer({ children }: Props) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const containerId = useId();

  let container = document.getElementById(containerId);

  if (container === null) {
    container = document.createElement("div");
    container.id = containerId;
    container.classList.add("ll-notifications-container");
    document.body.append(container);
  }

  const managerRef = useRef<NotificationsManager>();

  if (!managerRef.current) {
    managerRef.current = createNotificationsManager(setNotifications);
  }

  const manager = managerRef.current;

  return (
    <NotificationsContext.Provider value={manager}>
      {children}
      {createPortal(
        <div className="notifications">
          {notifications.map((props) => (
            <Notification
              {...props}
              key={props.id}
              onRemove={() => manager.removeNotification(props.id)}
            />
          ))}
        </div>,
        container,
      )}
    </NotificationsContext.Provider>
  );
}
