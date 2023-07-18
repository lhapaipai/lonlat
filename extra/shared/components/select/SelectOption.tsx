import { useListItem } from "@floating-ui/react";
import { useSelect } from ".";
import cn from "classnames";
import { Option } from "./interface";

interface Props {
  option: Option;
}

export default function SelectOption({ option }: Props) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useSelect();

  const { ref, index } = useListItem({ label: option.label });
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
      {option.label}
    </button>
  );
}
