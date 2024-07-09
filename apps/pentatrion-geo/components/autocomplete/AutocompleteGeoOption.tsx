import { memo, useId } from "react";
import { useListItem } from "@floating-ui/react";
import {
  useAutocomplete,
  getOptionValue,
} from "pentatrion-design/components/autocomplete";
import { GeoPointOption } from "../../types";
import { getTypeLabel } from "../../geo-options";
import clsx from "clsx";

type Props = GeoPointOption;

export const AutocompleteGeoOption = memo(function AutocompleteGeoOption({
  properties: { label, id, type, name, context },
}: Props) {
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
        isSelected ? "bg-gray-2" : isActive && "bg-gray-1",
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
          {getTypeLabel(type)}
        </div>
      </div>

      <div className="flex w-[calc(100%-3rem)] flex-col justify-center px-2 text-sm">
        <div className="truncate">{name}</div>
        <div className="truncate text-xs text-gray-6">{context}</div>
      </div>
    </div>
  );
});
