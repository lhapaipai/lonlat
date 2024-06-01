import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageRemoved, selectMessages } from ".";
import { nanoid } from "@reduxjs/toolkit";
import { Snack } from "../../components/snack";
import { Message } from "../../types.d";

interface Props {
  children: ReactNode;
}

export function NotificationConsumer({ children }: Props) {
  const container = useRef<HTMLDivElement>(null!);
  if (!container.current) {
    container.current = document.createElement("div");
    container.current.id = nanoid();
    container.current.classList.add("fixed", "bottom-0", "left-0", "right-0", "z-notification");
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
        <div className="mb-4 flex flex-col gap-4 items-center">
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
