import { ReactNode } from "react";
import { ColorType } from "../types";
import "./Alert.scss";
import cn from "classnames";

interface Props {
  type?: ColorType;
  children?: ReactNode;
  className?: string;
}
export default function Alert({ type = "primary", children, className }: Props) {
  return <div className={cn("alert-block", "p-2", `alert--${type}`, className)}>{children}</div>;
}
