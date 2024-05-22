import { Placement } from "@floating-ui/react";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import type { ThemeColor } from "~/types.d";

interface Props extends ComponentProps<"div"> {
  color?: ThemeColor;
  placement?: Placement;
  children: ReactNode;
}

export const dialogVariants = {
  color(color?: ThemeColor) {
    if (!color) {
      return "bg-gray-0";
    }
    return clsx(
      "border-t-4",
      {
        yellow: "border-t-yellow-3 bg-gray-0",
        gray: "border-t-gray-3 bg-gray-0",
        red: "border-t-red-3 bg-red-1",
        blue: "border-t-blue-3 bg-blue-1",
        green: "border-t-green-3 bg-green-1",
        orange: "border-t-orange-3 bg-orange-1",
      }[color],
    );
  },
};

export default function Dialog({ placement, color, children, className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        "rounded-2xl relative shadow dark:shadow-dark",
        dialogVariants.color(color),
        className,
      )}
      data-placement={placement}
      data-color={color}
      {...rest}
    >
      {children}
    </div>
  );
}
