import { ComponentPropsWithoutRef, useId } from "react";
import { ColorType } from "../types";
import cn from "classnames";
import "./Loader.scss";

interface Props extends ComponentPropsWithoutRef<"svg"> {
  size?: "small" | "medium" | "large";
  type?: ColorType;
}
export default function Loader({ size = "medium", type = "info", className, ...rest }: Props) {
  const id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("loader", `size-${size}`, `size-${type}`, className)}
      style={{
        color: `var(--color-${type}-700)`,
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
