import { useState } from "react";
import { Autocomplete } from ".";
import { Option } from "./interface";

interface Props {
  options: Option[];
}

export default function SimpleAutocomplete({ options }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [selection, setSelection] = useState<Option | null>(null);

  const filteredOptions = options.filter((option) => {
    return option.label.toLowerCase().startsWith(searchValue.toLowerCase());
  });

  return (
    <>
      <div>
        <Autocomplete
          searchValue={searchValue}
          onChangeSearchValue={setSearchValue}
          selection={selection}
          onChangeSelection={setSelection}
          options={filteredOptions}
        />
      </div>
      <div>selection : {selection && selection.label}</div>
    </>
  );
}
