import { ReactNode } from "react";
import { ThemeColor } from "../../types";
import "./Flash.scss";
import clsx from "clsx";

interface Props {
  color?: ThemeColor;
  children?: ReactNode;
  className?: string;
}
export default function Alert({ color = "yellow", children, className }: Props) {
  return <div className={clsx("ll-flash", "p-2", `alert-${color}`, className)}>{children}</div>;
}
