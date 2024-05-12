import "./Snack.scss";
import cn from "classnames";
import { Button, Loader, Message, useEventCallback } from "../..";
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
    <div
      className={cn(
        "ll-dialog",
        "animate-fade-in",
        "placement-top",
        "ll-snack",
        `border-color-${color}`,
      )}
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
    </div>
  );
}
