import { Button, LazyAutocomplete, Select } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import {
  AppGeoOption,
  GeoPointOption,
  c2cWaypointSearch,
  coordsSearch,
  createGeolocationGeoOption,
  ignSearch,
  orsSearch,
} from "pentatrion-geo";
import {
  SearchEngine,
  searchEngineChanged,
  searchEngines,
  selectSearchEngine,
  selectViewState,
} from "../store/mapSlice";
import { useNotification } from "pentatrion-design/redux";
import { useT } from "talkr";
import { useMemo, useState } from "react";
import { inputSearchDebounceDelay, openRouteServiceToken } from "~/config/constants";
import { SearchEngineOption, StarOption } from "~/components/search-engine/SearchEngineOption";
import { SearchEngineSelection } from "~/components/search-engine/SearchEngineSelection";
import { iconBySearchEngine } from "~/components/search-engine/util";
import { activationChanged } from "~/geolocation/geolocationSlice";
import FeatureInfos from "./FeatureInfos";
import GeolocationInfos from "~/geolocation/GeolocationInfos";
import AutocompleteGeoOption from "~/components/autocomplete/AutocompleteGeoOption";

export default function SearchTab() {
  const searchFeature = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const viewState = useAppSelector(selectViewState);
  const { notifyError } = useNotification();
  const searchEngine = useAppSelector(selectSearchEngine);
  const { T } = useT();
  const [showGeolocationInfos, setShowGeolocationInfos] = useState(false);
  const searchEngineOptions = useMemo<StarOption[]>(() => {
    return searchEngines.map((s) => ({
      value: s,
      label: T(`searchEngine.${s}.label`),
      icon: iconBySearchEngine(s),
    }));
  }, [T]);

  return (
    <div className="ll-quick-settings">
      <div>
        <LazyAutocomplete<GeoPointOption>
          autocompleteOptionComponent={AutocompleteGeoOption}
          clearSearchButton={true}
          placeholder={T(`searchEngine.${searchEngine}.placeholder`)}
          debounce={inputSearchDebounceDelay}
          icon={
            <Select
              variant="ghost"
              showArrow={false}
              selectionClassName="ml-auto search-engine-selector"
              width={37}
              floatingMinWidth={220}
              placement="bottom-start"
              options={searchEngineOptions}
              value={searchEngine}
              onChange={(o) => {
                const searchEngine = o.target.value as SearchEngine;
                dispatch(searchEngineChanged(searchEngine));
              }}
              selectSelectionComponent={SearchEngineSelection}
              selectOptionComponent={SearchEngineOption}
              zIndex={110}
            />
          }
          selectionSuffix={
            searchFeature?.properties.type === "geolocation" && (
              <Button icon variant="ghost" onClick={() => setShowGeolocationInfos((s) => !s)}>
                <i className="fe-sliders"></i>
              </Button>
            )
          }
          noSearchSuffix={
            <Button
              icon
              variant="ghost"
              onClick={() => {
                dispatch(searchFeatureChanged(createGeolocationGeoOption(T("myGeolocation"))));
                dispatch(activationChanged(true));
              }}
            >
              <i className="fe-geolocation"></i>
            </Button>
          }
          selection={searchFeature}
          onChangeSelection={(e) => dispatch(searchFeatureChanged(e))}
          onChangeSearchValueCallback={async (searchValue) => {
            let collection: AppGeoOption[] = [];
            try {
              if (searchEngine === "c2c") {
                collection = await c2cWaypointSearch(searchValue);
              } else if (searchEngine === "ors") {
                // we're not defining openRouteServiceUrl because self-hosted doesn't provide
                // geocode service
                collection = await orsSearch(searchValue, viewState.center, openRouteServiceToken);
              } else if (searchEngine === "coords") {
                collection = coordsSearch(searchValue);
                console.log("result", collection);
              } else {
                collection = await ignSearch(searchValue, viewState.center);
              }
              return collection;
            } catch (err) {
              notifyError(err);
              throw err;
            }
          }}
        />
      </div>
      {searchFeature && searchFeature.properties.type !== "geolocation" && <FeatureInfos />}
      {searchFeature && searchFeature.properties.type === "geolocation" && showGeolocationInfos && (
        <GeolocationInfos />
      )}
    </div>
  );
}
