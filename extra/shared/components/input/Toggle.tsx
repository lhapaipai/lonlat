import { ComponentPropsWithRef, forwardRef, useRef } from "react";
import { useCombinedRefs } from "../..";
import "./Toggle.scss";
import cn from "classnames";

interface Props extends ComponentPropsWithRef<"input"> {
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ disabled = false, checked, children, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label className={cn("ll-toggle-container", disabled && "disabled")}>
        <input
          ref={combinedRef}
          disabled={disabled}
          type="checkbox"
          className={cn("ll-toggle")}
          checked={checked}
          {...rest}
        />
        {children}
      </label>
    );
  },
);

export default Checkbox;
