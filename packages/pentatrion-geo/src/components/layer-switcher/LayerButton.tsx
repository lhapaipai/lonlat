import clsx from "clsx";
import { ComponentProps, useRef } from "react";
import { buttonVariants, useRipple } from "pentatrion-design";

interface Props extends ComponentProps<"button"> {
  disabled?: boolean;
  selected?: boolean;
  image: string;
  srcSet?: string;
  imagePositionY: number;
  label: string;
  variant?: "base" | "optional" | "principal";
}

export default function LayerButton({
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
        "min-w-0 rounded cursor-pointer relative overflow-clip focus-visible:outline focus-visible:outline-2 no-underline border-0 inline-flex flex-col items-center transition-color-shadow duration-300 leading-5 ",
        variant === "principal"
          ? "p-1 w-14 h-14 overflow-hidden "
          : // we need w-[calc(90px+0.5rem)] for layer-switcher container : "width: fit-content;"
            "flex-[0_0_calc(90px+0.5rem)] w-[calc(90px+0.5rem)] py-1 pt-1",
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
      <div className={clsx("overflow-hidden", variant === "principal" && "w-full h-full")}>
        <img
          src={image}
          srcSet={srcSet}
          className={clsx(
            "object-cover w-[90px] h-[54px] max-w-none",
            variant === "principal" ? "" : "",
          )}
          style={{ objectPosition: `0px ${imagePositionY}px` }}
        />
      </div>
      <div className={clsx("truncate text-sm  ", variant === "principal" && "hidden")}>{label}</div>
    </button>
  );
}
