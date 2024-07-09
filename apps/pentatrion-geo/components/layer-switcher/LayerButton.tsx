import clsx from "clsx";
import { ComponentProps, useRef } from "react";
import { useRipple } from "pentatrion-design/hooks";
import { buttonVariants } from "pentatrion-design/components/button";

interface Props extends ComponentProps<"button"> {
  disabled?: boolean;
  selected?: boolean;
  image: string;
  srcSet?: string;
  imagePositionY: number;
  label: string;
  variant?: "base" | "optional" | "principal";
}

export function LayerButton({
  disabled,
  className,
  image,
  srcSet,
  imagePositionY,
  label,
  selected = false,
  variant = "base",
  ...props
}: Props) {
  const inputRef = useRef<HTMLButtonElement>(null);
  const ripples = useRipple(inputRef);

  return (
    <button
      ref={inputRef}
      tabIndex={0}
      role="button"
      className={clsx(
        "relative inline-flex min-w-0 cursor-pointer flex-col items-center overflow-clip rounded border-0 leading-5 no-underline transition-color-shadow duration-300 focus-visible:outline focus-visible:outline-2",
        variant === "principal"
          ? "h-14 w-14 overflow-hidden p-1"
          : // we need w-[calc(90px+0.5rem)] for layer-switcher container : "width: fit-content;"
            "w-[calc(90px+0.5rem)] flex-[0_0_calc(90px+0.5rem)] py-1 pt-1",
        className,
        buttonVariants.variant.light("yellow"),
        selected && "active",
        disabled && "disabled",
      )}
      data-variant="light"
      disabled={disabled}
      {...props}
    >
      {ripples}
      <div
        className={clsx(
          "overflow-hidden",
          variant === "principal" && "h-full w-full",
        )}
      >
        <img
          src={image}
          srcSet={srcSet}
          className={clsx(
            "h-[54px] w-[90px] max-w-none object-cover",
            variant === "principal" ? "" : "",
          )}
          style={{ objectPosition: `0px ${imagePositionY}px` }}
        />
      </div>
      <div
        className={clsx(
          "truncate text-sm",
          variant === "principal" && "hidden",
        )}
      >
        {label}
      </div>
    </button>
  );
}
