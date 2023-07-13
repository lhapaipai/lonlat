import "./Button.scss";
import { ComponentPropsWithRef, forwardRef, useImperativeHandle, useRef } from "react";
import cn from "classnames";
import { ThemeColor } from "../types";
import useRipple from "../hooks/useRipple";

export interface Props extends ComponentPropsWithRef<"button"> {
  shape?: "solid" | "outline" | "ghost" | "underline";

  size?: "small" | "medium" | "large";

  color?: ThemeColor;

  children?: React.ReactNode;

  loading?: boolean;

  disabled?: boolean;

  fullWidth?: boolean;

  /**
   * For a selected item inside a group.
   */
  selected?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      shape = "solid",
      loading = false,
      color = "weak",
      size = "medium",
      fullWidth,
      className,
      disabled,
      children,
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
      "button",
      className,
      fullWidth && "w100",
      size !== "medium" && `size-${size}`,
      `button-${shape}-${color}`,
      `button-${color}`,
      `shape-${shape}`,
      notClickable && "not-cliquable",
    );

    const ripples = useRipple(inputRef);

    return (
      <button
        ref={inputRef}
        className={classNames}
        disabled={disabled}
        aria-busy={loading}
        {...props}
      >
        {!notClickable && ripples}
        {children}
        {loading && <span className="button-loader-container">Loading</span>}
      </button>
    );
  },
);

export default Button;
