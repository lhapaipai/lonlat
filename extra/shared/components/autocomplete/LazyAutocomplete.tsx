import { useState } from "react";
import { Autocomplete } from ".";
import { Option } from "./interface";

interface Props {
  onChangeSearchValue: (searchValue: string) => Promise<Option[]>;
}

export default function LazyAutocomplete({ onChangeSearchValue }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [selection, setSelection] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);

  async function handleChangeSearchValue(searchValue: string) {
    setSearchValue(searchValue);
    const newOptions = await onChangeSearchValue(searchValue);

    setOptions(newOptions);
  }

  return (
    <>
      <div>
        <Autocomplete
          searchValue={searchValue}
          onChangeSearchValue={handleChangeSearchValue}
          selection={selection}
          onChangeSelection={setSelection}
          options={options}
        />
      </div>
      <div>selection : {selection && selection.label}</div>
    </>
  );
}
