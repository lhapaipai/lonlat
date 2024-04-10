import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  NotificationsContext,
  createNotificationsManager,
  type NotificationsManager,
} from "./NotificationsContext";
import Snack from "../snack/Snack";
import { Message } from "../..";

interface Props {
  children: ReactNode;
}

export default function NotificationsProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<Message[]>([]);

  const container = useRef<HTMLDivElement>(null!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.id = Math.floor(Math.random() * 100000).toString();
    container.current.classList.add("ll-snack-bar");
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
        <div className="snack-bar-inner">
          {notifications.map((props) => (
            <Snack
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
