import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteOption } from ".";
import { Option } from "./interface";
import { useDebounce } from "usehooks-ts";
import { FetchError, useNotifications } from "../..";

interface Props<O extends Option = Option> {
  onChangeSearchValue: (searchValue: string) => Promise<O[]>;
  AutocompleteOptionCustom?: typeof AutocompleteOption<O>;
  debounce?: number;
}
export default function LazyAutocomplete<O extends Option = Option>({
  onChangeSearchValue,
  debounce = 200,
  ...rest
}: Props<O>) {
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounced = useDebounce(searchValue, debounce);
  const [selection, setSelection] = useState<O | null>(null);
  const [options, setOptions] = useState<O[]>([]);
  const notificationManager = useNotifications();

  useEffect(() => {
    let abort = false;

    if (searchValueDebounced.trim() === "") {
      setOptions([]);
      return;
    }

    onChangeSearchValue(searchValueDebounced)
      .then((newOptions) => {
        if (!abort) {
          setOptions(newOptions);
        }
      })
      .catch((err) => {
        if (err instanceof FetchError || err instanceof TypeError) {
          notificationManager.addNotification(err.message);
        } else {
          throw err;
        }
      });

    return () => {
      abort = true;
    };
  }, [searchValueDebounced, onChangeSearchValue, notificationManager]);

  return (
    <>
      <div>
        <Autocomplete
          searchValue={searchValue}
          onChangeSearchValue={(newValue) => setSearchValue(newValue)}
          selection={selection}
          onChangeSelection={setSelection}
          options={options}
          {...rest}
        />
      </div>
      <div>selection : {selection && selection.label}</div>
    </>
  );
}
