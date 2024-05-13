import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import "./ButtonGroup.scss";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
}

export default function ButtonGroup({ children, className, direction = "horizontal" }: Props) {
  return (
    <div className={clsx("ll-button-group", `direction-${direction}`, className)}>{children}</div>
  );
}
