import { useId } from "react";
import { TownOption } from "./interface";
import { useListItem } from "@floating-ui/react";
import useAutocomplete from "./useAutocompleteContext";
import cn from "classnames";
import { Highlight, Option } from "../..";

type Props<O extends Option> = O & {
  searchValue: string;
};

export default function AutocompleteGeocodageOption({
  label,
  value,
  icon,
  nom_commune,
  context,
  _formatted,
}: Props<TownOption>) {
  const id = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label: label });
  const isActive = activeIndex === index;
  const isSelected = selection?.value === value;

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
        <i className={icon}></i>
      </div>
      <div className="content">
        <div>
          <Highlight value={nom_commune} indices={_formatted?.nom_commune} />
        </div>
        <div className="hint">{context}</div>
      </div>
    </div>
  );
}
