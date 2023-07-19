import { useListItem } from "@floating-ui/react";
import { useSelect } from ".";
import cn from "classnames";
import { Option } from "./interface";

export interface SelectOptionProps<O extends Option> {
  option: O;
}

export default function SelectOption<O extends Option>({ option }: SelectOptionProps<O>) {
  const { activeIndex, selectedIndexes, getItemProps, handleSelect } = useSelect();

  const { ref, index } = useListItem({ label: option.label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndexes.indexOf(index) !== -1;

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
