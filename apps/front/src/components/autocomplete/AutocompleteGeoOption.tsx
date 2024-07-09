import { memo, useId } from "react";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { getOptionValue, useAutocomplete } from "pentatrion-design";
import { useT } from "talkr";
import { GeoPointOption } from "pentatrion-geo/types";

type Props = GeoPointOption;

function AutocompleteGeoOption({
  properties: { label, id, type, name, context },
}: Props) {
  const { T } = useT();
  const uniqId = useId();
  const { activeIndex, selection, getItemProps, handleSelect } =
    useAutocomplete();
  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selection ? getOptionValue(selection) === id : false;
  return (
    <div
      className={clsx(
        "option",
        "flex h-12 px-0",
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
      <div className="flex-flex-col h-12 w-12">
        <div className="flex-1 text-xl flex-center">
          <i className={`fe-${type}`}></i>
        </div>
        <div className="truncate text-center text-2xs/[11px] text-gray-6">
          {T(`featureType.${type}`)}
        </div>
      </div>

      <div className="flex w-[calc(100%-3rem)] flex-col justify-center px-2 text-sm">
        <div className="truncate">{name}</div>
        <div className="truncate text-xs text-gray-6">{context}</div>
      </div>
    </div>
  );
}

export default memo(AutocompleteGeoOption) as (props: Props) => JSX.Element;
