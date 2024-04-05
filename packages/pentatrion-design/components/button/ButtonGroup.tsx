import { ComponentProps, ReactNode } from "react";
import cn from "classnames";
import "./ButtonGroup.scss";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
}

export default function ButtonGroup({ children, className, direction = "horizontal" }: Props) {
  return (
    <div className={cn("ll-button-group", `direction-${direction}`, className)}>{children}</div>
  );
}
