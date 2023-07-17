import { ReactNode } from "react";
import { ColorType } from "../../types";
import "./Flash.scss";
import cn from "classnames";

interface Props {
  type?: ColorType;
  children?: ReactNode;
  className?: string;
}
export default function Alert({ type = "primary", children, className }: Props) {
  return <div className={cn("ll-flash", "p-2", `alert--${type}`, className)}>{children}</div>;
}
