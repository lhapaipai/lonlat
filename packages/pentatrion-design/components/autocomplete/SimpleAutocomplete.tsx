import { useLayoutEffect, useRef, useState } from "react";
import { Autocomplete } from ".";
import { useEventCallback, Option } from "../..";

interface Props {
  options: Option[];
  selection?: Option | null;
  onChangeSelection: (o: Option | null) => void;
}

export default function SimpleAutocomplete({
  options,
  selection = null,
  onChangeSelection,
}: Props) {
  const onChangeSelectionStable = useEventCallback(onChangeSelection);

  const [searchValue, setSearchValue] = useState(selection?.value ?? "");

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
    if (searchValueRef.current !== selection.label) {
      setSearchValue(selection.label);
    }
  }, [selection, setSearchValue]);

  const filteredOptions =
    selection !== null
      ? []
      : options.filter((option) => {
          return option.label.toLowerCase().startsWith(searchValue.toLowerCase());
        });

  return (
    <Autocomplete
      searchValue={searchValue}
      onChangeSearchValue={setSearchValue}
      selection={selection}
      onChangeSelection={onChangeSelectionStable}
      options={filteredOptions}
    />
  );
}
