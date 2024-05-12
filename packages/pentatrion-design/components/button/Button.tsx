import "./Button.scss";
import { ComponentPropsWithRef, forwardRef, useImperativeHandle, useRef } from "react";
import cn from "classnames";
import { ThemeColor } from "../../types";
import { Loader, useRipple } from "../..";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  withRipple?: boolean;

  variant?: "contained" | "outlined" | "text" | "ghost";

  size?: "small" | "medium" | "large";

  color?: ThemeColor;

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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      withRipple = true,
      variant = "contained",
      loading = false,
      color = "yellow",
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
      fullWidth && "w-full",
      size !== "medium" && `size-${size}`,
      selected && "selected",
      `variant-${variant}-${color}`,
      `variant-${variant}`,
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
        {!notClickable && withRipple && ripples}
        {children}
        {loading && <Loader color={color} size="small" className="ml-2" />}
      </button>
    );
  },
);

export default Button;
