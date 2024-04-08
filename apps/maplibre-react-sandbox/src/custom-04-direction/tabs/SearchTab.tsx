import { LazyAutocomplete } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import { searchFeatureChanged, selectSearchFeature } from "../store/searchSlice";
import { AutocompleteGeoOption, ignSearch, parseIgnAddressCollection } from "pentatrion-geo";
import { selectViewState } from "../store/mapSlice";

export default function SearchTab() {
  const selection = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const viewState = useAppSelector(selectViewState);

  return (
    <>
      <LazyAutocomplete
        debounce={1000}
        icon={false}
        selection={selection}
        onChangeSelection={(e) => dispatch(searchFeatureChanged(e))}
        onChangeSearchValueCallback={async (searchValue) => {
          const collection = await ignSearch(searchValue, viewState.center);
          return parseIgnAddressCollection(collection);
        }}
        AutocompleteOptionCustom={AutocompleteGeoOption}
      />
    </>
  );
}
