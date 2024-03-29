import { useLayoutEffect, useRef, useState } from "react";
import { Autocomplete, AutocompleteProps } from ".";
import { useEventCallback, Option, OptionLike } from "../..";
import { getLabel } from "./util";

interface Props<O extends OptionLike = Option>
  extends Pick<
    AutocompleteProps<O>,
    | "icon"
    | "placement"
    | "placeholder"
    | "selection"
    | "onChangeSelection"
    | "AutocompleteOptionCustom"
    | "options"
    | "selection"
  > {}

export default function SimpleAutocomplete<O extends OptionLike = Option>({
  options,
  selection = null,
  onChangeSelection,
  ...rest
}: Props<O>) {
  const onChangeSelectionStable = useEventCallback(onChangeSelection);

  const [searchValue, setSearchValue] = useState(selection ? getLabel(selection) : "");

  const searchValueRef = useRef(searchValue);
  searchValueRef.current = searchValue;

  // side effect, update the searchValue <input /> value when
  // selection come from outside
  useLayoutEffect(() => {
    if (selection === null) {
      setSearchValue("");
      return;
    }

    // we need the fresh value of searchValue but we don't
    // want searchValue as useEffect dependency
    const selectionLabel = getLabel(selection);
    if (searchValueRef.current !== getLabel(selection)) {
      setSearchValue(selectionLabel);
    }
  }, [selection, setSearchValue]);

  const filteredOptions =
    selection !== null
      ? []
      : options.filter((option) => {
          const optionLabel = getLabel(option);
          return optionLabel.toLowerCase().startsWith(searchValue.toLowerCase());
        });

  return (
    <Autocomplete
      searchValue={searchValue}
      onChangeSearchValue={setSearchValue}
      selection={selection}
      onChangeSelection={onChangeSelectionStable}
      options={filteredOptions}
      {...rest}
    />
  );
}
