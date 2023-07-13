import { ReactNode } from "react";
import { ThemeColor } from "../types";
import "./Alert.scss";
import cn from "classnames";

interface Props {
  type?: ThemeColor;
  children?: ReactNode;
  className?: string;
}
export default function Alert({ type = "primary", children, className }: Props) {
  return <div className={cn("alert-block", "p-2", `alert--${type}`, className)}>{children}</div>;
}
