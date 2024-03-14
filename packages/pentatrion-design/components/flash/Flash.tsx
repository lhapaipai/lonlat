import { ReactNode } from "react";
import { ThemeColor } from "../../types";
import "./Flash.scss";
import cn from "classnames";

interface Props {
  color?: ThemeColor;
  children?: ReactNode;
  className?: string;
}
export default function Alert({ color = "primary", children, className }: Props) {
  return <div className={cn("ll-flash", "p-2", `alert-${color}`, className)}>{children}</div>;
}
