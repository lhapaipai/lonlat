import { memo, useId } from "react";
import { OptionLike } from "../..";
import { useListItem } from "@floating-ui/react";
import useAutocomplete from "./useAutocompleteContext";
import cn from "classnames";
import { getLabel, getValue } from "./util";

export type AutocompleteOptionProps<O extends OptionLike> = O;

function AutocompleteOption<O extends OptionLike>(props: AutocompleteOptionProps<O>) {
  const label = getLabel(props);

  const id = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selection ? getValue(selection) === getValue(props) : false;

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

export default memo(AutocompleteOption);
