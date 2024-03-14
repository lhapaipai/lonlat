import { useId } from "react";
import { Option } from "./interface";
import { useListItem } from "@floating-ui/react";
import useAutocomplete from "./useAutocompleteContext";
import cn from "classnames";

type Props<O extends Option> = O & {
  searchValue: string;
};

export default function AutocompleteOption<O extends Option>({ label, value }: Props<O>) {
  const id = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label: label });
  const isActive = activeIndex === index;
  const isSelected = selection?.value === value;

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
      {label}
    </div>
  );
}
