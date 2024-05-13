import { ComponentPropsWithoutRef, useId } from "react";
import { ThemeColor } from "../../types";
import cn from "classnames";
import "./Loader.scss";

interface Props extends ComponentPropsWithoutRef<"svg"> {
  size?: "small" | "medium" | "large";
  color?: ThemeColor;
}
export default function Loader({ size = "medium", color = "blue", className, ...rest }: Props) {
  const id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("ll-loader", `size-${size}`, `text-${color}-4`, className)}
      style={{
        color: `var(--color-${color}-5)`,
      }}
      viewBox="0 0 16 16"
      {...rest}
    >
      <defs>
        <circle id={id} cx="8" cy="8" r="7" />
      </defs>
      <use href={`#${id}`} className="track" />
      <use href={`#${id}`} className="circle" />
    </svg>
  );
}
