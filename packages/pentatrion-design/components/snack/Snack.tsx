import clsx from "clsx";
import { useEffect } from "react";

import { Button } from "../button";
import { useEventCallback } from "~/hooks";
import { Dialog } from "../dialog";
import Loader from "../loader/Loader";
import { Message } from "~/lib";

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
    <Dialog className={clsx("animate-fade-in", "ll-snack")} placement="top" color={color}>
      <div className="w-fit min-w-60 px-2 py-1 flex items-center">
        <span className="pr-4 flex-1">{content}</span>
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
