import { ReactNode } from "react";
import { ThemeColor } from "../../types";
import clsx from "clsx";

interface Props {
  color?: ThemeColor;
  children?: ReactNode;
  className?: string;
}

const config = {
  yellow: "border-yellow-3",
  gray: "border-gray-3",
  red: "border-red-3",
  orange: "border-orange-3",
  green: "border-green-3",
  blue: "border-blue-3",
};

export default function Alert({ color = "yellow", children, className }: Props) {
  return (
    <div className={clsx("p-2 shadow border-l-4 dark:shadow-dark", config[color], className)}>
      {children}
    </div>
  );
}
