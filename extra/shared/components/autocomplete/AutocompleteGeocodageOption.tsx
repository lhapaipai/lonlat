import { useId } from "react";
import { Option, TownOption } from "./interface";
import { useListItem } from "@floating-ui/react";
import useAutocomplete from "./useAutocompleteContext";
import cn from "classnames";
import { Highlight } from "../..";

interface Props<O extends Option> {
  option: O;
}

export default function AutocompleteGeocodageOption({ option }: Props<TownOption>) {
  const id = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label: option.label });
  const isActive = activeIndex === index;
  const isSelected = selection?.value === option.value;

  return (
    <div
      className={cn("option", "search", isSelected && "selected", isActive && "active")}
      ref={ref}
      role="option"
      id={id}
      aria-selected={isActive}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      <div className="icon flex-center">
        <i className={option.icon}></i>
      </div>
      <div className="content">
        <div>
          <Highlight value={option.nom_commune} indices={option?._formatted?.nom_commune} />
        </div>
        <div className="hint">{option.context}</div>
      </div>
    </div>
  );
}
