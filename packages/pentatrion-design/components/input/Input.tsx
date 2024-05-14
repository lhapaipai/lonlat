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
      <div
        className={clsx(
          "rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-1 hover:outline-gray-2 flex focus-full:outline-yellow-4 focus-full:outline-2",
          disabled && "disabled",
          `variant-${variant}`,
          className,
        )}
      >
        {prefix && (
          <div
            className={clsx([
              "flex-center relative",
              typeof prefix === "string" && "mx-2 select-none text-gray-6",
            ])}
          >
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            "h-8 flex-1 appearance-none outline-none filter-none min-w-0 bg-transparent",
            !prefix && "pl-4",
            !suffix && "pr-4",
          )}
          {...rest}
          disabled={disabled}
        />
        {suffix && (
          <div
            className={clsx([
              "flex-center relative",
              typeof suffix === "string" && "mx-2 select-none text-gray-6",
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
