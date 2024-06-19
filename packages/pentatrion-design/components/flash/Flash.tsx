import { ReactNode } from "react";
import { ThemeColor } from "../../types.d";
import clsx from "clsx";
import { colorVariants } from "../../lib";

interface Props {
  color?: ThemeColor;
  children?: ReactNode;
  className?: string;
}

export function Flash({ color = "yellow", children, className }: Props) {
  return (
    <div
      className={clsx(
        "border-l-4 bg-gray-0 p-2 shadow dark:shadow-dark [&_p]:m-0",
        colorVariants[color].border,
        className,
      )}
    >
      {children}
    </div>
  );
}
