import { ReactNode } from "react";
import { ThemeColor } from "../../types";
import clsx from "clsx";
import { colorVariants } from "~design/lib/tailwindVariants";

interface Props {
  color?: ThemeColor;
  children?: ReactNode;
  className?: string;
}

export default function Alert({ color = "yellow", children, className }: Props) {
  return (
    <div
      className={clsx(
        "p-2 shadow border-l-4 dark:shadow-dark",
        colorVariants[color].border,
        className,
      )}
    >
      {children}
    </div>
  );
}
