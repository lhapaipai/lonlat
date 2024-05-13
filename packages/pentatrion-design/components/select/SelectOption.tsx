import { useListItem } from "@floating-ui/react";
import { useSelect } from ".";
import clsx from "clsx";
import { Option } from "./interface";

type Props<O extends Option> = O;

export default function SelectOption<O extends Option>({ label }: Props<O>) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useSelect();

  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      className={clsx("option", isSelected && "selected", isActive && "active")}
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {label}
    </button>
  );
}
