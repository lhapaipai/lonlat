import { Button, LazyAutocomplete } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import { AutocompleteGeoOption, createGeolocationFeature, ignSearch } from "pentatrion-geo";
import { selectViewState } from "../store/mapSlice";
import { useNotification } from "pentatrion-design/redux";
import { activationChanged } from "../geolocation/geolocationSlice";

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
        noSearchSuffix={
          <Button
            icon
            variant="ghost"
            onClick={() => {
              dispatch(searchFeatureChanged(createGeolocationFeature()));
              dispatch(activationChanged(true));
            }}
          >
            <i className="fe-locate"></i>
          </Button>
        }
        clearSearchButton={true}
        selection={selection}
        autocompleteOptionComponent={AutocompleteGeoOption}
        onChangeSelection={(e) => dispatch(searchFeatureChanged(e))}
        onChangeSearchValueCallback={async (searchValue) => {
          try {
            const collection = await ignSearch(searchValue, viewState.center);
            return collection;
          } catch (err) {
            notifyError(err);
            throw err;
          }
        }}
      />
    </>
  );
}
