import clsx from "clsx";
import { forwardRef, ComponentProps } from "react";
import type { ThemeColor } from "../../types.d";

export interface TextareaProps extends ComponentProps<"textarea"> {
  variant?: "normal" | "ghost";
  color?: ThemeColor;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      variant = "normal",
      color = "yellow",
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <textarea
        data-color={color}
        data-variant={variant}
        ref={ref}
        className={clsx(
          "p8n-textarea min-w-0 appearance-none rounded-2xl bg-transparent p-2 outline-offset-[-1px] filter-none",
          disabled && "disabled",
          className,
        )}
        disabled={disabled}
        {...rest}
      />
    );
  },
);
