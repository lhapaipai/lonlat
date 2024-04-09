import { NotificationProps } from "./interface";

import "./Notification.scss";
import "../dialog/Dialog.scss";
import cn from "classnames";
import { Button, Loader } from "../..";

export default function Notification({
  message,
  color = "primary",
  withLoader = false,
  canClose = false,
  onRemove = () => {},
}: NotificationProps) {
  return (
    <div
      className={cn(
        "ll-dialog",
        "ll-animate",
        "fade-in",
        "placement-top",
        "ll-notification",
        `border-color-${color}`,
      )}
    >
      <div className="box">
        <span className="message">{message}</span>
        {withLoader && <Loader size="small" color="weak" />}

        {canClose && (
          <Button icon variant="ghost" color="weak" onClick={onRemove}>
            <i className="fe-cancel"></i>
          </Button>
        )}
      </div>
    </div>
  );
}
