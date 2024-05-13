import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import clsx from "clsx";

import "./Input.scss";

export interface InputProps extends Omit<ComponentPropsWithRef<"input">, "prefix"> {
  variant?: "normal" | "ghost";
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "normal", disabled = false, prefix, suffix, className, ...rest }, ref) => {
    return (
      <div className={clsx("ll-input", disabled && "disabled", `variant-${variant}`, className)}>
        {prefix && (
          <div
            className={clsx([
              "flex-center",
              "adornment",
              "prefix",
              typeof prefix === "string" && "ml-2",
            ])}
          >
            {prefix}
          </div>
        )}
        <input ref={ref} className={clsx("input-element")} {...rest} disabled={disabled} />
        {suffix && (
          <div
            className={clsx([
              "flex-center",
              "adornment",
              "suffix",
              typeof suffix === "string" && "mr-2",
            ])}
          >
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

export default Input;
