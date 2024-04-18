import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Autocomplete, AutocompleteProps } from ".";
import { OptionLike, Option, useStateDebounce } from "../..";
import { useEventCallback } from "../..";
import { getLabel } from "./util";

interface Props<O extends OptionLike = Option>
  // Omit "searchValue" | "onChangeSearchValue" | "options"
  extends Pick<
    AutocompleteProps<O>,
    | "icon"
    | "placement"
    | "placeholder"
    | "selection"
    | "onChangeSelection"
    | "autocompleteOptionComponent"
    | "loading"
    | "clearSearchButton"
  > {
  onChangeSearchValueCallback: (searchValue: string) => Promise<O[]>;
  debounce?: number;
}

export default function LazyAutocomplete<O extends OptionLike = Option>({
  onChangeSearchValueCallback,
  debounce = 500,
  selection = null,
  onChangeSelection,
  ...rest
}: Props<O>) {
  const onChangeSelectionStable = useEventCallback(onChangeSelection);

  const [searchValue, searchValueDebounced, setSearchValue] = useStateDebounce(
    selection ? getLabel(selection) : "",
    debounce,
  );

  const searchValueRef = useRef(searchValue);
  searchValueRef.current = searchValue;

  const inputRef = useRef<HTMLInputElement>(null!);

  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState<O[]>([]);

  const handleChangeSelection = useCallback(
    (selection: O | null) => {
      onChangeSelectionStable(selection);
      if (selection) {
        setOptions([]);
      }
    },
    [onChangeSelectionStable],
  );

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
    const selectionLabel = getLabel(selection);
    if (searchValueRef.current !== selectionLabel) {
      setSearchValue(selectionLabel, true);
    }
  }, [selection, setSearchValue]);

  /**
   * set new options when searchValueDebounced change
   */
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
      .catch(() => {
        setLoading(false);
      });

    return () => {
      setLoading(false);
      abort = true;
    };
  }, [selection, searchValueDebounced, onChangeSearchValueCallback]);

  return (
    <Autocomplete
      ref={inputRef}
      searchValue={searchValue}
      onChangeSearchValue={(newValue, immediate) => {
        setSearchValue(newValue, immediate || newValue === "" ? true : false);
      }}
      selection={selection}
      onChangeSelection={handleChangeSelection}
      options={options}
      loading={loading}
      {...rest}
    />
  );
}
