import { ReactNode, useEffect, useRef, useState } from "react";
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

export default function NotificationsProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const container = useRef<HTMLDivElement>(null!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.id = Math.floor(Math.random() * 100000).toString();
    container.current.classList.add("ll-notifications-container");
    document.body.append(container.current);
  }

  useEffect(() => {
    return () => {
      container.current && container.current.remove();
    };
  }, []);

  const managerRef = useRef<NotificationsManager>();

  if (!managerRef.current) {
    managerRef.current = createNotificationsManager(setNotifications);
  }

  const manager = managerRef.current;

  return (
    <>
      <NotificationsContext.Provider value={manager}>{children}</NotificationsContext.Provider>
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
        container.current,
      )}
    </>
  );
}
