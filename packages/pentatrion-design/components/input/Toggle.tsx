import { ComponentPropsWithRef, forwardRef, useRef } from "react";
import { ThemeColor, useCombinedRefs } from "../..";
import clsx from "clsx";

interface Props extends ComponentPropsWithRef<"input"> {
  disabled?: boolean;
  color?: ThemeColor;
}

const Toggle = forwardRef<HTMLInputElement, Props>(
  ({ color = "yellow", disabled = false, checked, className, children, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label className={clsx("cursor-pointer flex items-center", disabled && "disabled")}>
        <input
          data-color={color}
          ref={combinedRef}
          disabled={disabled}
          type="checkbox"
          className={clsx(
            "p8n-input-checkbox p8n-input-toggle ll-toggle w-[30px] h-[18px] box-border appearance-none rounded-xl inline-block relative mr-1 bg-gray-1 checked:bg-gray-0 after:absolute after:top-[3px] after:left-[3px] after:rounded-full after:w-[12px] after:h-[12px] after:bg-gray-2 after:outline after:outline-1 after:outline-gray-3 checked:after:bg-current checked:after:translate-x-[12px] checked:after:outline-current after:transition-all",
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

export default Toggle;
