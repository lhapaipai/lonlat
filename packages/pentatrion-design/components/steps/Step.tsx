import { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
interface Props extends ComponentPropsWithoutRef<"li"> {
  icon?: ReactNode;
  status?: "done" | "current" | "todo";

  /** choose center if content height is less than ll-circle height */
  align?: "start" | "center";

  markerClassName?: string;
  contentClassName?: string;
}

export function Step({
  status = "todo",
  className,
  children,
  markerClassName,
  contentClassName,
  align = "start",
  icon = null,
  ...rest
}: Props) {
  return (
    <li className={clsx(["ll-step", `status-${status}`, `align-${align}`, className])} {...rest}>
      <div className="marker-container">
        <div
          className={clsx([
            "marker",
            "relative z-[1] inline-flex items-center justify-center rounded-full ",
            ["done", "current"].includes(status) && "active",
            markerClassName,
          ])}
        >
          {icon}
        </div>
      </div>
      <div className={clsx(["content", contentClassName])}>{children}</div>
    </li>
  );
}
