import { memo, useId } from "react";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
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
      className={clsx(
        "option",
        "h-12 flex px-0",
        isSelected && "bg-gray-2",
        isActive && "bg-gray-1",
      )}
      ref={ref}
      role="option"
      id={uniqId}
      aria-selected={isActive}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      <div className="h-12 w-12 flex-flex-col">
        <div className="flex-1 text-xl flex-center">
          <i className={`fe-${type}`}></i>
        </div>
        <div className="text-center text-gray-6 text-2xs/[11px] truncate">
          {T(`featureType.${type}`)}
        </div>
      </div>

      <div className="flex flex-col justify-center text-sm w-[calc(100%-3rem)] px-2">
        <div className="truncate">{name}</div>
        <div className="text-gray-6 text-xs truncate">{context}</div>
      </div>
    </div>
  );
}

export default memo(AutocompleteGeoOption);
