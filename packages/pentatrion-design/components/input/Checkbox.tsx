import { ComponentPropsWithRef, forwardRef, useRef } from "react";
import { type ThemeColor } from "../../types.d";
import { useCombinedRefs } from "../../hooks";
import clsx from "clsx";

export interface CheckboxProps extends ComponentPropsWithRef<"input"> {
  indeterminate?: boolean;
  disabled?: boolean;
  color?: ThemeColor;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      color = "yellow",
      indeterminate,
      disabled = false,
      checked,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label
        className={clsx(
          "flex cursor-pointer items-center",
          disabled && "disabled",
        )}
      >
        <input
          data-color={color}
          ref={combinedRef}
          disabled={disabled}
          type="checkbox"
          className={clsx(
            "p8n-input-checkbox",
            "my-0 mr-1 inline-block h-5 w-5 shrink-0 select-none appearance-none rounded bg-gray-0 bg-origin-border p-0",
            indeterminate && "indeterminate",
            className,
          )}
          checked={checked}
          {...rest}
        />
        {children}
      </label>
    );
  },
);
