import { useId } from "react";
import { Option } from "./interface";
import { useListItem } from "@floating-ui/react";
import useAutocomplete from "./useAutocompleteContext";
import cn from "classnames";

interface Props<O extends Option> {
  option: O;
}

export default function AutocompleteOption<O extends Option>({ option }: Props<O>) {
  const id = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label: option.label });
  const isActive = activeIndex === index;
  const isSelected = selection?.value === option.value;

  return (
    <div
      className={cn("option", isSelected && "selected", isActive && "active")}
      ref={ref}
      role="option"
      id={id}
      aria-selected={isActive}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {option.label}
    </div>
  );
}
