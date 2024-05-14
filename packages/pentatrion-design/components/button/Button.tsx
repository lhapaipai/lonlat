import { ComponentPropsWithRef, forwardRef, useImperativeHandle, useRef } from "react";
import clsx from "clsx";
import { ThemeColor } from "../../types";
import { Loader, useRipple } from "../..";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  withRipple?: boolean;

  variant?: "contained" | "outlined" | "text" | "ghost";

  size?: "small" | "medium" | "large";

  color?: ThemeColor;

  children?: React.ReactNode;

  /**
   * undefined: hidden
   * false: invisible
   * true: visible
   */
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

export const buttonVariants = {
  size(icon: boolean, size: "small" | "medium" | "large") {
    switch (size) {
      case "small":
        return clsx(!icon && "px-2", "text-sm h-6");
      case "medium":
        return !icon && "px-4 h-8";
      case "large":
        return !icon && "px-8 h-12";
    }
  },
  variant: {
    contained(color: ThemeColor) {
      return clsx(
        "shadow hover:shadow-md focus:shadow-md active-full:shadow-lg",
        {
          yellow:
            "text-yellow-text bg-yellow-3 hover:bg-yellow-4 active-full:bg-yellow-5 focus-visible:outline-yellow-5",
          gray: "text-gray-text bg-gray-3 hover:bg-gray-4 active-full:bg-gray-5 focus-visible:outline-gray-5",
          red: "text-red-text bg-red-3 hover:bg-red-4 active-full:bg-red-5 focus-visible:outline-red-5",
          orange:
            "text-orange-text bg-orange-3 hover:bg-orange-4 active-full:bg-orange-5 focus-visible:outline-orange-5",
          green:
            "text-green-text bg-green-3 hover:bg-green-4 active-full:bg-green-5 focus-visible:outline-green-5",
          blue: "text-blue-text bg-blue-3 hover:bg-blue-4 active-full:bg-blue-5 focus-visible:outline-blue-5",
        }[color],
      );
    },
    outlined(color: ThemeColor) {
      return clsx(
        "bg-gray-0 text-gray-7 outline outline-2 outline-offset-[-2px] focus-visible:ring-2 active-full:shadow-md",
        {
          yellow:
            "hover:bg-yellow-1/50 active-full:bg-yellow-2/50 outline-yellow-5 focus-visible:ring-yellow-4",
          gray: "hover:bg-gray-1 active-full:bg-gray-2 outline-gray-5 focus-visible:ring-gray-4",
          red: "hover:bg-red-1/50 active-full:bg-red-2/50 outline-red-5 focus-visible:ring-red-4",
          orange:
            "hover:bg-orange-1/50 active-full:bg-orange-2/50 outline-orange-5 focus-visible:ring-orange-4",
          green:
            "hover:bg-green-1/50 active-full:bg-green-2/50 outline-green-5 focus-visible:ring-green-4",
          blue: "hover:bg-blue-1/50 active-full:bg-blue-2/50 outline-blue-5 focus-visible:ring-blue-4",
        }[color],
      );
    },
    text(color: ThemeColor) {
      return clsx(
        "bg-transparent active-full:shadow-sm",
        {
          yellow:
            "hover:bg-yellow-1/50 active-full:bg-yellow-2/25 text-yellow-4 hover:text-yellow-5",
          gray: "hover:bg-gray-1 active-full:bg-gray-2 text-gray-5 hover:text-gray-6 active-full:text-gray-7",
          red: "hover:bg-red-1/50 active-full:bg-red-2/50 text-red-4 hover:text-red-5",
          orange:
            "hover:bg-orange-1/50 active-full:bg-orange-2/50 text-orange-4 hover:text-orange-5",
          green: "hover:bg-green-1/50 active-full:bg-green-2/50 text-green-4 hover:text-green-5",
          blue: "hover:bg-blue-1/50 active-full:bg-blue-2/50 text-blue-4 hover:text-blue-5",
        }[color],
      );
    },
    ghost(color: ThemeColor) {
      return clsx(
        "bg-transparent",
        {
          yellow: "text-yellow-4 hover:text-yellow-5",
          gray: "text-gray-5 hover:text-gray-6 active-full:text-gray-7",
          red: "text-red-4 hover:text-red-5",
          orange: "text-orange-4 hover:text-orange-5",
          green: "text-green-4 hover:text-green-5",
          blue: "text-blue-4 hover:text-blue-5",
        }[color],
      );
    },
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      withRipple = true,
      variant = "contained",
      loading,
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

    const ripples = useRipple(inputRef);

    // check if overflow-clip-margin: 1px; is needed ?
    return (
      <button
        tabIndex={focusable ? 0 : -1}
        role="button"
        ref={inputRef}
        className={clsx(
          "rounded-2xl cursor-pointer relative overflow-clip focus-visible:outline focus-visible:outline-2 no-underline border-0 inline-flex items-center transition-color-shadow duration-300 leading-5",
          className,
          buttonVariants.size(icon, size),
          buttonVariants.variant[variant](color),
          icon && "justify-center min-w-8 h-8 [&_i]:w-8 [&_:last-child:not(i)]:pr-4",
          fullWidth && "w-full",
          selected && "active",
          `button-variant-${variant}`,
          notClickable && "not-cliquable",
        )}
        disabled={disabled}
        aria-busy={loading}
        {...props}
      >
        {!notClickable && withRipple && ripples}
        {children}
        {loading !== undefined && (
          <span className="">
            <Loader
              color={color}
              size="small"
              className={clsx("ml-2 -mr-2", !loading && "invisible")}
            />
          </span>
        )}
      </button>
    );
  },
);

export default Button;
