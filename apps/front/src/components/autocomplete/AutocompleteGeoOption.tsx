import { memo, useId } from "react";
import { useListItem } from "@floating-ui/react";
import cn from "classnames";
import { getOptionValue, useAutocomplete } from "pentatrion-design";
import { useT } from "talkr";
import { GeoPointOption } from "pentatrion-geo";

type Props = GeoPointOption;

function AutocompleteGeoOption({ properties: { label, id, type, name, context } }: Props) {
  const { T } = useT();
  const uniqId = useId();
  const { activeIndex, selection, getItemProps, handleSelect } = useAutocomplete();
  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selection ? getOptionValue(selection) === id : false;
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
        <div className="type">{T(`featureType.${type}`)}</div>
      </div>

      <div className="content">
        <div>{name}</div>
        <div className="context">{context}</div>
      </div>
    </div>
  );
}

export default memo(AutocompleteGeoOption);
