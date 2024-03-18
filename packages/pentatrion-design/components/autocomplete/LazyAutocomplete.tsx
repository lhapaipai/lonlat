import { useCallback, useEffect, useState } from "react";
import { Autocomplete, AutocompleteProps } from ".";
import { Option } from "../..";
import { FetchError, useDebounce, useEventCallback, useNotifications } from "../..";

interface Props<O extends Option = Option>
  extends Omit<
    AutocompleteProps<O>,
    "onChangeSearchValue" | "options" | "onChangeSelection" | "searchValue"
  > {
  onChangeSearchValueCallback: (searchValue: string) => Promise<O[]>;
  debounce?: number;

  onChangeSelection?: ((o: O | null) => void) | null;
}

export default function LazyAutocomplete<O extends Option = Option>({
  onChangeSearchValueCallback,
  debounce = 500,
  selection: controlledSelection = null,
  onChangeSelection = null,
  ...rest
}: Props<O>) {
  const isControlled = onChangeSelection !== null;
  const onChangeSelectionStable = useEventCallback(onChangeSelection);

  const [searchValue, setSearchValue] = useState("");
  const [searchValueDebounced, setSearchValueDebouncedImmediately] = useDebounce(
    searchValue,
    debounce,
  );
  const [loading, setLoading] = useState(false);

  const [uncontrolledSelection, setUncontrolledSelection] = useState<O | null>(null);

  const [options, setOptions] = useState<O[]>([]);
  const notificationManager = useNotifications();

  const selection = isControlled ? controlledSelection : uncontrolledSelection;

  const handleChangeSelection = useCallback(
    (selection: O | null) => {
      if (isControlled) {
        onChangeSelectionStable(selection);
      } else {
        setUncontrolledSelection(selection);
      }
      if (selection) {
        setOptions((options) => options.filter((o) => o.value === selection.value));
      }
    },
    [onChangeSelectionStable, setUncontrolledSelection, isControlled],
  );

  useEffect(() => {
    let abort = false;

    // when we're selecting option we change searchValue to be the complete label
    // value but we don't want to fetch new research
    if (selection) {
      return;
    }

    if (searchValueDebounced.trim() === "") {
      setOptions([]);
      return;
    }

    setLoading(true);

    onChangeSearchValueCallback(searchValueDebounced)
      .then((newOptions) => {
        setLoading(false);

        if (!abort) {
          setOptions(newOptions);
        }
      })
      .catch((err) => {
        setLoading(false);

        if (err instanceof FetchError || err instanceof TypeError) {
          notificationManager.addNotification(err.message);
        } else {
          throw err;
        }
      });

    return () => {
      abort = true;
    };
  }, [selection, searchValueDebounced, onChangeSearchValueCallback, notificationManager]);

  return (
    <Autocomplete
      searchValue={searchValue}
      onChangeSearchValue={(newValue, selectionLabel) => {
        setSearchValue(newValue);
        (selectionLabel || newValue === "") && setSearchValueDebouncedImmediately(newValue);
      }}
      selection={selection}
      onChangeSelection={handleChangeSelection}
      options={options}
      loading={loading}
      {...rest}
    />
  );
}
