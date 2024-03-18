import { useId } from "react";
import { useListItem } from "@floating-ui/react";
import useAutocomplete from "./useAutocompleteContext";
import cn from "classnames";
import { GeoFeatureOption, Option } from "../..";
import { getTypeLabel } from "pentatrion-geo";

type Props<O extends Option> = O & {
  searchValue: string;
};

export default function AutocompleteGeoFeatureOption({
  label,
  value,
  feature,
}: Props<GeoFeatureOption>) {
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
        <i className={`fe-${feature.properties.type}`}></i>
      </div>
      <div className="content">
        <div>{feature.properties.name}</div>
        <div className="context">{feature.properties.context}</div>
      </div>
      <div className="type">{getTypeLabel(feature.properties.type)}</div>
    </div>
  );
}
