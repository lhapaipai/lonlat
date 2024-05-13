import { ComponentPropsWithRef, forwardRef, useRef } from "react";
import { useCombinedRefs } from "../..";
import "./Toggle.scss";
import clsx from "clsx";

interface Props extends ComponentPropsWithRef<"input"> {
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ disabled = false, checked, className, children, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label className={clsx("ll-toggle-container", disabled && "disabled")}>
        <input
          ref={combinedRef}
          disabled={disabled}
          type="checkbox"
          className={clsx("ll-toggle", className)}
          checked={checked}
          {...rest}
        />
        {children}
      </label>
    );
  },
);

export default Checkbox;
