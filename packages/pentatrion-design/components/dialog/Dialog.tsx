import { Placement } from "@floating-ui/react";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { ThemeColor } from "~design/types";

interface Props extends ComponentProps<"div"> {
  status?: "open" | "close";
  color?: ThemeColor;
  placement?: Placement;
  children: ReactNode;
}

export const dialogVariants = {
  arrow(placement: Placement) {
    if (placement.includes("top")) {
      return "arrow-top";
    } else if (placement.includes("bottom")) {
      return "arrow-bottom";
    } else if (placement.includes("left")) {
      return "arrow-left";
    } else if (placement.includes("right")) {
      return "arrow-right";
    }
  },
  placement(placement: Placement) {
    const classNames: string[] = [];
    if (placement.includes("top")) {
      // classNames.push("border-t-4");
      switch (placement) {
        case "top":
          classNames.push("origin-bottom");
          break;
        case "top-start":
          classNames.push("origin-bottom-left");
          break;
        case "top-end":
          classNames.push("origin-bottom-right");
          break;
      }
    } else if (placement.includes("bottom")) {
      // classNames.push("border-b-4");
      switch (placement) {
        case "bottom":
          classNames.push("origin-top");
          break;
        case "bottom-start":
          classNames.push("origin-top-left");
          break;
        case "bottom-end":
          classNames.push("origin-top-right");
          break;
      }
    } else if (placement.includes("left")) {
      // classNames.push("border-l-4");
      switch (placement) {
        case "left":
          classNames.push("origin-right");
          break;
        case "left-start":
          classNames.push("origin-top-right");
          break;
        case "left-end":
          classNames.push("origin-bottom-right");
          break;
      }
    } else if (placement.includes("right")) {
      // classNames.push("border-r-4");
      switch (placement) {
        case "right":
          classNames.push("origin-left");
          break;
        case "right-start":
          classNames.push("origin-top-left");
          break;
        case "right-end":
          classNames.push("origin-bottom-left");
          break;
      }
    }
    return classNames.join(" ");
  },
};

export default function Dialog({ placement, color, status, children, className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        "ll-dialog rounded-2xl relative bg-gray-0 shadow",
        className,
        placement && dialogVariants.placement(placement),
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
