import { ComponentPropsWithRef, forwardRef, useRef } from "react";
import { type ThemeColor } from "~/types.d";
import { useCombinedRefs } from "~/hooks";
import clsx from "clsx";

interface Props extends ComponentPropsWithRef<"input"> {
  indeterminate?: boolean;
  disabled?: boolean;
  color?: ThemeColor;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    { color = "yellow", indeterminate, disabled = false, checked, className, children, ...rest },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label className={clsx("flex items-center cursor-pointer", disabled && "disabled")}>
        <input
          data-color={color}
          ref={combinedRef}
          disabled={disabled}
          type="checkbox"
          className={clsx(
            "p8n-input-checkbox",
            "appearance-none p-0 inline-block bg-origin-border select-none shrink-0 h-5 w-5 bg-gray-0 my-0 mr-1 rounded",
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

export default Checkbox;
