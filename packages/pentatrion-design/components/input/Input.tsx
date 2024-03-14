import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import cn from "classnames";

import "./Input.scss";

export interface InputProps extends Omit<ComponentPropsWithRef<"input">, "prefix"> {
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled = false, prefix, suffix, className, ...rest }, ref) => {
    return (
      <div className={cn("ll-input", disabled && "disabled", className)}>
        {prefix && <div className="ml-2 flex-center adornment">{prefix}</div>}
        <input ref={ref} className={cn("input-element")} {...rest} disabled={disabled} />
        {suffix && <div className="mr-2 flex-center adornment">{suffix}</div>}
      </div>
    );
  },
);

export default Input;
