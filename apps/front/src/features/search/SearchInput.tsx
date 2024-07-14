import { Button, LazyAutocomplete, Select } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import { c2cWaypointSearch, ignSearch, orsSearch } from "pentatrion-geo/api";
import { AppGeoOption, GeoPointOption } from "pentatrion-geo/types";
import {
  coordsSearch,
  createGeolocationGeoOption,
} from "pentatrion-geo/geo-options";
import {
  SearchEngine,
  searchEngineChanged,
  searchEngines,
  selectReadOnly,
  selectSearchEngine,
} from "~/features/config/configSlice";
import { selectViewState } from "~/features/map/mapSlice";

import { useReduxNotifications } from "pentatrion-design/redux";
import { useT } from "talkr";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  inputSearchDebounceDelay,
  openRouteServiceToken,
} from "~/config/constants";
import {
  SearchEngineOption,
  SearchEngineOptionProps,
} from "~/components/search-engine/SearchEngineOption";
import { SearchEngineSelection } from "~/components/search-engine/SearchEngineSelection";
import { iconBySearchEngine } from "~/components/search-engine/util";
import {
  activationChanged,
  selectGeolocation,
} from "~/features/geolocation/geolocationSlice";
import AutocompleteGeoOption from "~/components/autocomplete/AutocompleteGeoOption";
import { geolocationIconClassName } from "../geolocation/util";
import GeolocationInfos from "../geolocation/GeolocationInfos";

export default function SearchInput() {
  const feature = useAppSelector(selectSearchFeature);
  const readOnly = useAppSelector(selectReadOnly);
  const dispatch = useAppDispatch();
  const viewState = useAppSelector(selectViewState);
  const { notifyError } = useReduxNotifications();
  const searchEngine = useAppSelector(selectSearchEngine);
  const { T } = useT();
  const [showGeolocationInfos, setShowGeolocationInfos] = useState(false);
  const searchEngineOptions = useMemo<SearchEngineOptionProps[]>(() => {
    return searchEngines.map((s) => ({
      value: s,
      label: T(`searchEngine.${s}.label`),
      icon: iconBySearchEngine(s),
    }));
  }, [T]);
  const geolocation = useAppSelector(selectGeolocation);

  let suffix: ReactNode;

  useEffect(() => {
    setTimeout(() => {
      (
        document.querySelector("input[type='search']") as HTMLInputElement
      )?.focus();
    });
  }, []);

  if (feature) {
    suffix =
      feature?.properties.type === "geolocation" &&
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
      ));
  }

  return (
    <>
      <div>
        <LazyAutocomplete<GeoPointOption>
          autocompleteOptionComponent={AutocompleteGeoOption}
          clearSearchButton={true}
          placeholder={T(`searchEngine.${searchEngine}.placeholder`)}
          debounce={inputSearchDebounceDelay}
          readOnly={readOnly}
          icon={
            <Select
              disabled={readOnly}
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
          suffix={suffix}
          noSearchSuffix={
            !readOnly && (
              <Button
                icon
                variant="ghost"
                color="gray"
                onClick={() => {
                  dispatch(
                    searchFeatureChanged(
                      createGeolocationGeoOption(T("myGeolocation")),
                    ),
                  );
                  dispatch(activationChanged(true));
                }}
              >
                <i className="fe-geolocation"></i>
              </Button>
            )
          }
          selection={feature}
          onChangeSelection={(e) => dispatch(searchFeatureChanged(e))}
          onChangeSearchValueCallback={async (searchValue) => {
            let collection: AppGeoOption[] = [];
            try {
              if (searchEngine === "c2c") {
                collection = await c2cWaypointSearch(searchValue);
              } else if (searchEngine === "ors") {
                // we're not defining openRouteServiceUrl because self-hosted doesn't provide
                // geocode service
                collection = await orsSearch(
                  searchValue,
                  viewState.center,
                  openRouteServiceToken,
                );
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
      {feature &&
        feature.properties.type === "geolocation" &&
        showGeolocationInfos && <GeolocationInfos />}
    </>
  );
}
