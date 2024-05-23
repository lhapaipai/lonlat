import { Button, LazyAutocomplete, Select } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import { SearchFeature, searchFeatureChanged, selectSearchFeature } from "./searchSlice";
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
} from "~/store/mapSlice";
import { useNotification } from "pentatrion-design/redux";
import { useT } from "talkr";
import { useMemo, useState } from "react";
import { inputSearchDebounceDelay, openRouteServiceToken } from "~/config/constants";
import { SearchEngineOption, StarOption } from "~/components/search-engine/SearchEngineOption";
import { SearchEngineSelection } from "~/components/search-engine/SearchEngineSelection";
import { iconBySearchEngine } from "~/components/search-engine/util";
import { activationChanged, selectGeolocation } from "~/features/geolocation/geolocationSlice";
import FeatureInfos from "./FeatureInfos";
import GeolocationInfos from "~/features/geolocation/GeolocationInfos";
import AutocompleteGeoOption from "~/components/autocomplete/AutocompleteGeoOption";
import { geolocationIconClassName } from "../geolocation/util";

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
  const geolocation = useAppSelector(selectGeolocation);
  return (
    <div className="grid grid-cols-1 gap-2">
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
              selectionClassName=""
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
            searchFeature?.properties.type === "geolocation" &&
            (geolocation.status === "on" ? (
              <Button
                icon
                variant="ghost"
                color="gray"
                onClick={() => setShowGeolocationInfos((s) => !s)}
              >
                <i className="fe-geolocation-cog"></i>
              </Button>
            ) : (
              <i className={geolocationIconClassName(geolocation)}></i>
            ))
          }
          noSearchSuffix={
            <Button
              icon
              variant="ghost"
              color="gray"
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
            console.log("onChangeSearchValueCallback", searchValue);
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
