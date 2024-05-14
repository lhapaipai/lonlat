import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
}

const buttonGroupVariants = {
  horizontal:
    "[&_:not(:first-child)]:rounded-bl-none [&_:not(:last-child)]:rounded-tr-none [&_.button-variant-outlined]:-mx-[1px]",
  vertical:
    "flex flex-col [&_:not(:first-child)]:rounded-tr-none [&_:not(:last-child)]:rounded-bl-none [&_.button-variant-outlined]:-my-[1px]",
};

export default function ButtonGroup({ children, className, direction = "horizontal" }: Props) {
  return (
    <div
      className={clsx(
        "ll-button-group [&_:not(:first-child)]:rounded-tl-none [&_:not(:last-child)]:rounded-br-none",
        buttonGroupVariants[direction],
        `direction-${direction}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
