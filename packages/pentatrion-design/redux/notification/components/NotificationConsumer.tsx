import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageRemoved, selectMessages } from "../notificationSlice";
import { nanoid } from "@reduxjs/toolkit";
import Snack from "../../../components/snack/Snack";
import { Message } from "../../../lib";

interface Props {
  children: ReactNode;
}

export default function NotificationConsumer({ children }: Props) {
  const container = useRef<HTMLDivElement>(null!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.id = nanoid();
    container.current.classList.add("ll-snack-bar");
    document.body.append(container.current);
  }

  if (!container.current.parentElement) {
    console.log("NotificationConsumer n'a pas de parent !!", container);
    document.body.append(container.current);
  }

  useEffect(() => {
    return () => {
      container.current && container.current.remove();
    };
  }, []);

  const messages = useSelector(selectMessages) as Message[];
  const dispatch = useDispatch();
  return (
    <>
      {children}
      {createPortal(
        <div className="snack-bar-inner">
          {messages.map((message) => (
            <Snack
              key={message.id}
              {...message}
              onRemove={() => dispatch(messageRemoved(message.id))}
            />
          ))}
        </div>,
        container.current,
      )}
    </>
  );
}
