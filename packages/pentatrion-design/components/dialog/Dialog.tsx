import { Placement } from "@floating-ui/react";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { ThemeColor } from "~design/types";

interface Props extends ComponentProps<"div"> {
  status?: "open" | "close";
  color?: ThemeColor;
  placement?: Placement;
  children: ReactNode;
}

export default function Dialog({ placement, color, status, children, className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        "ll-dialog rounded-2xl relative bg-gray-0 shadow dark:shadow-dark",
        className,
      )}
      data-placement={placement}
      {...rest}
    >
      {children}
    </div>
  );
}
