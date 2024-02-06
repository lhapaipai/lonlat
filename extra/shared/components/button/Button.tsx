import "./Button.scss";
import { ComponentPropsWithRef, forwardRef, useImperativeHandle, useRef } from "react";
import cn from "classnames";
import { ColorType } from "../../types";
import useRipple from "../../hooks/useRipple";
import { Loader } from "../..";

export interface Props extends Omit<ComponentPropsWithRef<"button">, "type"> {
  withRipple?: boolean;

  shape?: "solid" | "outline" | "ghost" | "underline";

  size?: "small" | "medium" | "large";

  type?: ColorType;

  children?: React.ReactNode;

  loading?: boolean;

  disabled?: boolean;

  fullWidth?: boolean;

  focusable?: boolean;

  /**
   * For a selected item inside a group.
   */
  selected?: boolean;

  icon?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      withRipple = true,
      shape = "solid",
      loading = false,
      type = "primary",
      size = "medium",
      focusable = true,
      fullWidth,
      className,
      disabled,
      children,
      selected = false,
      icon = false,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
      ref,
      () => inputRef.current,
    );

    const notClickable = loading || disabled;

    const classNames = cn(
      "ll-button",
      className,
      icon && "icon",
      fullWidth && "w100",
      size !== "medium" && `size-${size}`,
      selected && "selected",
      `shape-${shape}-${type}`,
      `button-${type}`,
      `shape-${shape}`,
      notClickable && "not-cliquable",
    );

    const ripples = useRipple(inputRef);

    return (
      <button
        tabIndex={focusable ? 0 : -1}
        role="button"
        ref={inputRef}
        className={classNames}
        disabled={disabled}
        aria-busy={loading}
        {...props}
      >
        {!notClickable && withRipple && shape !== "underline" && ripples}
        {children}
        {loading && <Loader type={type} size="small" className="ml-2" />}
      </button>
    );
  },
);

export default Button;
