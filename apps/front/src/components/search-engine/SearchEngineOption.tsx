import { useListItem } from "@floating-ui/react";
import { Option, useSelect } from "pentatrion-design";
import cn from "classnames";

export type StarOption = Option & {
  icon: string;
};

export function SearchEngineOption({ icon, label }: StarOption) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useSelect();

  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      className={cn("option", isSelected && "selected", isActive && "active")}
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      <i className={icon}></i> {label}
    </button>
  );
}
