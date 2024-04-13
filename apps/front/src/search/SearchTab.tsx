import { Button, LazyAutocomplete, useCopyToClipboard } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import {
  AutocompleteGeoOption,
  getCoordsStr,
  ignSearch,
  parseIgnAddressCollection,
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
import { useCallback, useState } from "react";
import { directionLocationsAddedFromSearch } from "~/direction/directionSlice";

function iconBySearchEngine(searchEngine: SearchEngine) {
  switch (searchEngine) {
    case "ign-address":
      return "fe-locality";
    case "c2c":
      return "fe-summit";
    case "nominatim":
      return "fe-globe";
  }
}

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

  return (
    <>
      <div>
        <div className="search-selector">
          {searchEngines.map((s) => (
            <Button
              key={s}
              icon
              variant="ghost"
              color="weak"
              selected={s === searchEngine}
              onClick={() => dispatch(searchEngineChanged(s))}
            >
              <i className={iconBySearchEngine(s)}></i>
            </Button>
          ))}
        </div>
        <LazyAutocomplete
          placeholder={T(`searchPlaceholder.${searchEngine}`)}
          debounce={1000}
          icon={iconBySearchEngine(searchEngine)}
          selection={searchFeature}
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
      </div>
      {searchFeature && (
        <>
          <div>
            <div>
              <div className="setting">
                <div className="text-hint">Coordonnées</div>
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
                      const value = getCoordsStr([6.497886, 46.091857], coordsUnit);
                      copy(value);
                      notify(`${T("copiedIntoClipboard")} : ${value}`);
                    }}
                  >
                    {getCoordsStr([6.497886, 46.091857], coordsUnit)}
                  </span>
                </div>
              </div>
              <div className="setting">
                <div className="text-hint">Altitude</div>
                <div>
                  {searchFeature.geometry.coordinates[2] ?? "-"}
                  <span className="text-hint"> m</span>
                </div>
              </div>
            </div>
          </div>
          <div className="actions">
            <Button
              variant="light"
              color="weak"
              selected={action === "isochrone"}
              onClick={() => setOrToggleAction("isochrone")}
            >
              <i className="fe-isochrone"></i>
            </Button>
            <Button
              variant="light"
              color="weak"
              onClick={() => {
                dispatch(directionLocationsAddedFromSearch(searchFeature));
                dispatch(searchFeatureChanged(null));
                dispatch(tabChanged("direction"));
              }}
            >
              <i className="fe-route"></i>
            </Button>
            <Button
              variant="light"
              color="weak"
              selected={action === "raw"}
              onClick={() => setOrToggleAction("raw")}
            >
              RAW
            </Button>
          </div>

          {action === "raw" && (
            <textarea
              className="ll-textarea text-sm raw"
              readOnly
              defaultValue={stringifyGeoOption(searchFeature)}
            />
          )}
        </>
      )}
    </>
  );
}
