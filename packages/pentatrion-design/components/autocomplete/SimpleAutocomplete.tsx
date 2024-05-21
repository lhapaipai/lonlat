import { useLayoutEffect, useRef, useState } from "react";
import { Autocomplete, AutocompleteProps } from ".";
import { Option, OptionLike } from "../select";
import { useEventCallback } from "../../hooks";
import { getOptionLabel } from "./util";

interface Props<O extends OptionLike = Option>
  extends Pick<
    AutocompleteProps<O>,
    | "className"
    | "icon"
    | "color"
    | "placement"
    | "placeholder"
    | "selection"
    | "onChangeSelection"
    | "autocompleteOptionComponent"
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

  const [searchValue, setSearchValue] = useState(selection ? getOptionLabel(selection) : "");

  const searchValueRef = useRef(searchValue);
  searchValueRef.current = searchValue;

  const inputRef = useRef<HTMLInputElement>(null!);

  // side effect, update the searchValue <input /> value when
  // selection come from outside
  useLayoutEffect(() => {
    if (selection === null) {
      if (document.activeElement !== inputRef.current) {
        setSearchValue("");
      }
      return;
    }

    // we need the fresh value of searchValue but we don't
    // want searchValue as useEffect dependency
    const selectionLabel = getOptionLabel(selection);
    if (searchValueRef.current !== getOptionLabel(selection)) {
      setSearchValue(selectionLabel);
    }
  }, [selection, setSearchValue]);

  const filteredOptions =
    selection !== null
      ? []
      : options.filter((option) => {
          const optionLabel = getOptionLabel(option);
          return optionLabel.toLowerCase().startsWith(searchValue.toLowerCase());
        });

  return (
    <Autocomplete
      ref={inputRef}
      searchValue={searchValue}
      onChangeSearchValue={setSearchValue}
      selection={selection}
      onChangeSelection={onChangeSelectionStable}
      options={filteredOptions}
      {...rest}
    />
  );
}
