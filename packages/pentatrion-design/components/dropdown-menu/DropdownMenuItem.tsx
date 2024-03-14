import { useListItem } from "@floating-ui/react";
import cn from "classnames";
import { useDropdownMenuContext } from ".";
import { ComponentProps, MouseEvent, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children: ReactNode;
}

export default function DropdownMenuItem({ children, onClick, ...rest }: Props) {
  const { activeIndex, getItemProps, handleSelect } = useDropdownMenuContext();

  const { ref, index } = useListItem({ label: children?.toString() });
  const isActive = activeIndex === index;
  return (
    <button
      className={cn("option", isActive && "active")}
      ref={ref}
      role="option"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        ...rest,
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
          onClick?.(e);
          handleSelect();
        },
      })}
    >
      {children}
    </button>
  );
}
