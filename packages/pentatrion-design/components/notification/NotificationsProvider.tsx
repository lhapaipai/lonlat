import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  NotificationsContext,
  createNotificationsManager,
  type NotificationsManager,
} from "./NotificationsContext";
import { Snack } from "../snack";
import { Message } from "../../types.d";

interface Props {
  children: ReactNode;
}

export function NotificationsProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<Message[]>([]);
  const container = useRef<HTMLDivElement>(null!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.id = Math.floor(Math.random() * 100000).toString();
    /* .ll-snack-bar */
    container.current.classList.add(
      "fixed",
      "bottom-0",
      "left-0",
      "right-0",
      "z-notification",
    );
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
      <NotificationsContext.Provider value={manager}>
        {children}
      </NotificationsContext.Provider>
      {createPortal(
        /* snack-bar-inner */
        <div className="mx-4 mb-4 flex flex-col items-center gap-4">
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
