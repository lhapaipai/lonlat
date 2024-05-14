import "./Snack.scss";
import clsx from "clsx";
import { Button, Dialog, Loader, Message, useEventCallback } from "../..";
import { useEffect } from "react";

export type SnackProps = Partial<Message> & {
  onRemove?: () => void;
};

export default function Snack({
  expiration = 5000,
  content = "",
  color = "yellow",
  withLoader = false,
  canClose = false,
  onRemove = () => {},
}: SnackProps) {
  const onRemoveStable = useEventCallback(onRemove);

  useEffect(() => {
    if (expiration === -1) {
      return;
    }

    const timeoutId = setTimeout(() => onRemoveStable(), expiration);
    return () => void clearTimeout(timeoutId);
  }, [onRemoveStable, expiration]);

  return (
    <Dialog
      className={clsx("ll-dialog", "animate-fade-in", "ll-snack", `border-${color}-2`)}
      placement="top"
    >
      <div className="box">
        <span className="message">{content}</span>
        {withLoader && <Loader size="small" color="gray" />}

        {canClose && (
          <Button icon variant="ghost" color="gray" onClick={onRemove}>
            <i className="fe-cancel"></i>
          </Button>
        )}
      </div>
    </Dialog>
  );
}
