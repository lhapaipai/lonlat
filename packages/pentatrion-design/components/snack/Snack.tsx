import clsx from "clsx";
import { useEffect } from "react";

import { Button } from "../button";
import { useEventCallback } from "../../hooks";
import { Dialog } from "../dialog";
import { Loader } from "../loader";
import { Message } from "../../types.d";

export type SnackProps = Partial<Message> & {
  onRemove?: () => void;
};

export function Snack({
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
      className={clsx("motion-safe:animate-fade-in", "ll-snack")}
      placement="top"
      color={color}
    >
      <div className="flex w-fit min-w-60 items-center px-2 py-1">
        <span className="flex-1 pr-4">{content}</span>
        {withLoader && <Loader size="small" color="gray" />}

        {canClose && (
          <Button icon variant="text" color="gray" onClick={onRemove}>
            <i className="fe-cancel"></i>
          </Button>
        )}
      </div>
    </Dialog>
  );
}
