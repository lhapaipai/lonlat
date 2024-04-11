import { LazyAutocomplete } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import { AutocompleteGeoOption, ignSearch, parseIgnAddressCollection } from "pentatrion-geo";
import { selectViewState } from "../store/mapSlice";
import { useNotification } from "pentatrion-design/redux";

export default function SearchTab() {
  const selection = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const viewState = useAppSelector(selectViewState);
  const { notifyError } = useNotification();
  return (
    <>
      <LazyAutocomplete
        debounce={1000}
        icon={false}
        selection={selection}
        onChangeSelection={(e) => dispatch(searchFeatureChanged(e))}
        onChangeSearchValueCallback={async (searchValue) => {
          try {
            const collection = await ignSearch(searchValue, viewState.center);
            return parseIgnAddressCollection(collection);
          } catch (err) {
            notifyError(err);
            throw err;
          }
        }}
        AutocompleteOptionCustom={AutocompleteGeoOption}
      />
    </>
  );
}
