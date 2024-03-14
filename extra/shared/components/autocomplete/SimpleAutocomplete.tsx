import { useCallback, useState } from "react";
import { Autocomplete } from ".";
import { Option } from "./interface";
import { useEventCallback } from "../..";

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

  const filteredOptions = options.filter((option) => {
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

  const selection = isControlled ? controlledSelection : uncontrolledSelection;

  return (
    <>
      <div>
        <Autocomplete
          searchValue={searchValue}
          onChangeSearchValue={setSearchValue}
          selection={selection}
          onChangeSelection={handleChangeSelection}
          options={filteredOptions}
        />
      </div>
      <div>selection : {selection && selection.label}</div>
    </>
  );
}
