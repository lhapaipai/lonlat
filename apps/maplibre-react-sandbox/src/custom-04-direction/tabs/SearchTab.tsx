import { LazyAutocomplete, AutocompleteFeatureOption } from "pentatrion-design";
import { handleChangeSearchValue } from "../lib";
import { useAppDispatch, useAppSelector } from "../store";
import { searchFeatureChanged, selectSearchFeature } from "../store/searchSlice";

export default function SearchTab() {
  const selection = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();

  return (
    <>
      <LazyAutocomplete
        debounce={1000}
        icon={false}
        selection={selection}
        onChangeSelection={(e) => dispatch(searchFeatureChanged(e))}
        onChangeSearchValueCallback={handleChangeSearchValue}
        AutocompleteOptionCustom={AutocompleteFeatureOption}
      />
    </>
  );
}
