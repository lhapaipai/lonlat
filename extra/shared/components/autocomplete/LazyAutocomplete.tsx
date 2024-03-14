import { useCallback, useEffect, useState } from "react";
import { Autocomplete, AutocompleteOption } from ".";
import { Option } from "../..";
import { FetchError, useDebounce, useEventCallback, useNotifications } from "../..";

interface Props<O extends Option = Option> {
  onChangeSearchValue: (searchValue: string) => Promise<O[]>;
  AutocompleteOptionCustom?: typeof AutocompleteOption<O>;
  debounce?: number;

  selection?: O | null;
  onChangeSelection?: ((o: O | null) => void) | null;
}

export default function LazyAutocomplete<O extends Option = Option>({
  onChangeSearchValue,
  debounce = 200,
  selection: controlledSelection = null,
  onChangeSelection = null,
  ...rest
}: Props<O>) {
  const isControlled = onChangeSelection !== null;
  const onChangeSelectionStable = useEventCallback(onChangeSelection);

  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounced = useDebounce(searchValue, debounce, true);
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

    onChangeSearchValue(searchValueDebounced)
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
  }, [selection?.value, searchValueDebounced, onChangeSearchValue, notificationManager]);

  return (
    <>
      <div>
        <Autocomplete
          searchValue={searchValue}
          onChangeSearchValue={(newValue) => setSearchValue(newValue)}
          selection={selection}
          onChangeSelection={handleChangeSelection}
          options={options}
          loading={loading}
          {...rest}
        />
      </div>
    </>
  );
}
