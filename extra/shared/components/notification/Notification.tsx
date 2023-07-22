import { NotificationProps } from "./interface";

import "./Notification.scss";
import "../dialog/Dialog.scss";
import cn from "classnames";
import { Button, Loader } from "../..";

export default function Notification({
  message,
  type = "primary",
  withLoader = false,
  canClose = false,
  onRemove = () => {},
}: NotificationProps) {
  return (
    <div className={cn("ll-dialog", "top", "ll-notification", `type-${type}`)}>
      <div className="box">
        <span className="message">{message}</span>
        {withLoader && <Loader size="small" type="weak" />}

        {canClose && (
          <Button icon shape="ghost" onClick={onRemove}>
            <i className="fe-cancel"></i>
          </Button>
        )}
      </div>
    </div>
  );
}
