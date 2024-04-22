import {
  Button,
  LazyAutocomplete,
  Select,
  SimpleTooltip,
  useCopyToClipboard,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import {
  AppGeoOption,
  AutocompleteGeoOption,
  c2cWaypointSearch,
  getCoordsStr,
  ignSearch,
  stringifyGeoOption,
} from "pentatrion-geo";
import {
  SearchEngine,
  coordsUnitChanged,
  searchEngineChanged,
  searchEngines,
  selectCoordsUnit,
  selectSearchEngine,
  selectViewState,
  tabChanged,
} from "../store/mapSlice";
import { useNotification } from "pentatrion-design/redux";
import { useT } from "talkr";
import { useCallback, useMemo, useState } from "react";
import { directionWayPointsAddedFromSearch } from "~/direction/directionSlice";
import Isochrone from "./Isochrone";
import { inputSearchDebounceDelay } from "~/config/constants";
import { SearchEngineOption, StarOption } from "~/components/search-engine/SearchEngineOption";
import { SearchEngineSelection } from "~/components/search-engine/SearchEngineSelection";
import { iconBySearchEngine } from "~/components/search-engine/util";

type Action = "isochrone" | "direction" | "raw";

export default function SearchTab() {
  const searchFeature = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const viewState = useAppSelector(selectViewState);
  const { notifyError } = useNotification();
  const searchEngine = useAppSelector(selectSearchEngine);
  const coordsUnit = useAppSelector(selectCoordsUnit);
  const { T } = useT();
  const [, copy] = useCopyToClipboard();
  const { notify } = useNotification();

  const [action, setAction] = useState<Action | null>(null);
  const setOrToggleAction = useCallback(
    (a: Action) => {
      if (a === action) {
        setAction(null);
      } else {
        setAction(a);
      }
    },
    [action],
  );

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
        <LazyAutocomplete
          autocompleteOptionComponent={AutocompleteGeoOption}
          clearSearchButton={true}
          placeholder={T(`searchPlaceholder.${searchEngine}`)}
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
            />
          }
          selection={searchFeature}
          onChangeSelection={(e) => dispatch(searchFeatureChanged(e))}
          onChangeSearchValueCallback={async (searchValue) => {
            let collection: AppGeoOption[] = [];
            try {
              if (searchEngine === "c2c") {
                collection = await c2cWaypointSearch(searchValue);
                // } else if (searchEngine === "nominatim") {
                //   // TODO
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
      {searchFeature && (
        <>
          <div>
            <div className="setting">
              <div className="text-hint">{T("coordinates")}</div>
              <div>
                <Button
                  className="size-small text-hint"
                  variant="ghost"
                  color="weak"
                  onClick={() => dispatch(coordsUnitChanged())}
                >
                  {T(`coordsUnit.${coordsUnit}`)}{" "}
                </Button>
                &nbsp;
                <span
                  className="can-copy"
                  onClick={() => {
                    const value = getCoordsStr(searchFeature.geometry.coordinates, coordsUnit);
                    copy(value);
                    notify(`${T("copiedIntoClipboard")} : ${value}`);
                  }}
                >
                  {getCoordsStr(searchFeature.geometry.coordinates, coordsUnit)}
                </span>
              </div>
            </div>
            <div className="setting">
              <div className="text-hint">{T("altitude")}</div>
              <div>
                {searchFeature.geometry.coordinates[2] ?? "-"}
                <span className="text-hint"> m</span>
              </div>
            </div>
          </div>
          <div className="actions">
            <SimpleTooltip content={T("tooltip.direction")} placement="top-start">
              <Button
                variant="light"
                color="weak"
                onClick={() => {
                  dispatch(directionWayPointsAddedFromSearch(searchFeature));
                  dispatch(tabChanged("direction"));
                }}
              >
                <i className="fe-route"></i>
              </Button>
            </SimpleTooltip>
            <SimpleTooltip content={T("tooltip.code")} placement="top">
              <Button
                variant="light"
                color="weak"
                selected={action === "raw"}
                onClick={() => setOrToggleAction("raw")}
              >
                <i className="fe-code"></i>
              </Button>
            </SimpleTooltip>
            <SimpleTooltip content={T("tooltip.isochrone")} placement="top-end">
              <Button
                variant="light"
                color="weak"
                selected={action === "isochrone"}
                onClick={() => setOrToggleAction("isochrone")}
              >
                <i className="fe-isochrone"></i>
              </Button>
            </SimpleTooltip>
          </div>

          {action === "raw" && (
            <>
              <div className="separator"></div>
              <textarea
                className="ll-textarea text-sm raw"
                readOnly
                defaultValue={stringifyGeoOption(searchFeature)}
              />
            </>
          )}

          {action === "isochrone" && (
            <>
              <div className="separator"></div>
              <Isochrone />
            </>
          )}
        </>
      )}
    </div>
  );
}
