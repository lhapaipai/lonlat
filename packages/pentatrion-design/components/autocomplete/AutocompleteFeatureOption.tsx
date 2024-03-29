import { useId } from "react";
import { useListItem } from "@floating-ui/react";
import useAutocomplete from "./useAutocompleteContext";
import cn from "classnames";
import { FeatureOption } from "../..";
import { getTypeLabel } from "pentatrion-geo";
import { getValue } from "./util";

type Props = FeatureOption;

export default function AutocompleteFeatureOption({
  properties: { label, id, type, name, context },
}: Props) {
  const uniqId = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selection ? getValue(selection) === id : false;

  return (
    <div
      className={cn("option", "search", isSelected && "selected", isActive && "active")}
      ref={ref}
      role="option"
      id={uniqId}
      aria-selected={isActive}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      <div className="prefix">
        <div className="icon flex-center">
          <i className={`fe-${type}`}></i>
        </div>
        <div className="type">{getTypeLabel(type)}</div>
      </div>

      <div className="content">
        <div>{name}</div>
        <div className="context">{context}</div>
      </div>
    </div>
  );
}
