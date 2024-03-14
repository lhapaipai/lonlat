import { ComponentProps, ReactNode } from "react";
import cn from "classnames";
import "./ButtonGroup.scss";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
}

export default function ButtonGroup({ children, className }: Props) {
  return <div className={cn("ll-button-group", className)}>{children}</div>;
}
