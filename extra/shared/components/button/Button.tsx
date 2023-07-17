import "./Button.scss";
import { ComponentPropsWithRef, forwardRef, useImperativeHandle, useRef } from "react";
import cn from "classnames";
import { ColorType } from "../../types";
import useRipple from "../../hooks/useRipple";
import { Loader } from "../..";

export interface Props extends Omit<ComponentPropsWithRef<"button">, "type"> {
  shape?: "solid" | "outline" | "ghost" | "underline";

  size?: "small" | "medium" | "large";

  type?: ColorType;

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
      type = "weak",
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
      "ll-button",
      className,
      fullWidth && "w100",
      size !== "medium" && `size-${size}`,
      `shape-${shape}-${type}`,
      `button-${type}`,
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
        {loading && <Loader type={type} size="small" className="ml-2" />}
      </button>
    );
  },
);

export default Button;
