import { ComponentPropsWithoutRef, ReactNode } from "react";
import cn from "classnames";
interface Props extends ComponentPropsWithoutRef<"li"> {
  icon?: ReactNode;
  status?: "done" | "current" | "todo";

  /** choose center if content height is less than ll-circle height */
  align?: "start" | "center";

  markerClassName?: string;
}

export default function Step({
  status = "todo",
  className,
  children,
  markerClassName,
  align = "start",
  icon = null,
  ...rest
}: Props) {
  return (
    <li className={cn(["ll-step", `status-${status}`, `align-${align}`, className])} {...rest}>
      <div className="marker-container">
        <div
          className={cn([
            "marker",
            ["done", "current"].includes(status) && "active",
            markerClassName,
          ])}
        >
          {icon}
        </div>
      </div>
      <div className={cn(["content"])}>{children}</div>
    </li>
  );
}
