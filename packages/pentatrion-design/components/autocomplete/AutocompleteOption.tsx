import { memo, useId } from "react";
import { OptionLike } from "../select";
import { useListItem } from "@floating-ui/react";
import { useAutocomplete } from ".";
import clsx from "clsx";
import { getOptionLabel, getOptionValue } from "./util";

export type AutocompleteOptionProps<O extends OptionLike> = O;

function AutocompleteOption<O extends OptionLike>(props: AutocompleteOptionProps<O>) {
  const label = getOptionLabel(props);

  const id = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selection ? getOptionValue(selection) === getOptionValue(props) : false;

  return (
    <div
      className={clsx("option", isSelected ? "bg-gray-2" : isActive && "bg-gray-1")}
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
