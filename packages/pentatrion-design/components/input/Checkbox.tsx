import { ComponentPropsWithRef, forwardRef, useRef } from "react";
import { useCombinedRefs } from "../..";
import "./Checkbox-Radio.scss";
import clsx from "clsx";

interface Props extends ComponentPropsWithRef<"input"> {
  indeterminate?: boolean;
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ indeterminate, disabled = false, checked, className, children, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label className={clsx("ll-input-checkbox-container", disabled && "disabled")}>
        <input
          ref={combinedRef}
          disabled={disabled}
          type="checkbox"
          className={clsx("ll-input-checkbox", indeterminate && "indeterminate", className)}
          checked={checked}
          {...rest}
        />
        {children}
      </label>
    );
  },
);

export default Checkbox;
