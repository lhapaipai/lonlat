import { useCallback, useState } from "react";
import { Autocomplete } from ".";
import { useEventCallback, Option } from "../..";

interface Props {
  options: Option[];
  selection?: Option | null;
  onChangeSelection?: ((o: Option | null) => void) | null;
}

export default function SimpleAutocomplete({
  options,
  selection: controlledSelection = null,
  onChangeSelection = null,
}: Props) {
  const isControlled = onChangeSelection !== null;

  const onChangeSelectionStable = useEventCallback(onChangeSelection);

  const [searchValue, setSearchValue] = useState("");
  const [uncontrolledSelection, setUncontrolledSelection] = useState<Option | null>(null);

  const selection = isControlled ? controlledSelection : uncontrolledSelection;

  const filteredOptions =
    selection !== null
      ? []
      : options.filter((option) => {
          return option.label.toLowerCase().startsWith(searchValue.toLowerCase());
        });

  const handleChangeSelection = useCallback(
    (selection: Option | null) => {
      if (isControlled) {
        onChangeSelectionStable(selection);
      } else {
        setUncontrolledSelection(selection);
      }
    },
    [onChangeSelectionStable, setUncontrolledSelection, isControlled],
  );

  return (
    <Autocomplete
      searchValue={searchValue}
      onChangeSearchValue={setSearchValue}
      selection={selection}
      onChangeSelection={handleChangeSelection}
      options={filteredOptions}
    />
  );
}
