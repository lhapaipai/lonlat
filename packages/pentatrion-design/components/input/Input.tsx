import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import clsx from "clsx";

import { ThemeColor } from "~design/types";

export interface InputProps extends Omit<ComponentPropsWithRef<"input">, "prefix"> {
  variant?: "normal" | "ghost";
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  color?: ThemeColor;
}

export const inputConfig = {
  container: "p8n-input-text rounded-2xl outline-offset-[-1px] flex ",
  input: "h-8 flex-1 appearance-none outline-none filter-none min-w-0 bg-transparent",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { variant = "normal", color = "yellow", disabled = false, prefix, suffix, className, ...rest },
    ref,
  ) => {
    return (
      <div
        data-color={color}
        className={clsx(
          inputConfig.container,
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
          className={clsx(inputConfig.input, !prefix && "pl-4", !suffix && "pr-4")}
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
