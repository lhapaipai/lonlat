import {
  Steps,
  LazyAutocomplete,
  Step,
  Sortable,
  NoDataOption,
  Button,
  getIndexLetter,
  SimpleTooltip,
  Checkbox,
  Select,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import {
  directionWayPointChanged,
  directionWayPointsChanged,
  directionWayPointInsertAt,
  directionWayPointRemoved,
  selectDirection,
  optimizationChanged,
  profileChanged,
  constraintChanged,
} from "./directionSlice";
import {
  AppGeoOption,
  DirectionOptions,
  GeoPointOption,
  c2cWaypointSearch,
  coordsSearch,
  createNodataFeature,
  getHours,
  GeoOption,
  getMinutes,
  ignSearch,
  isNoData,
  m2km,
  orsSearch,
  updateId,
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
import { SearchEngineSelection } from "~/components/search-engine/SearchEngineSelection";
import { SearchEngineOption, StarOption } from "~/components/search-engine/SearchEngineOption";
import { iconBySearchEngine } from "~/components/search-engine/util";
import AutocompleteGeoOption from "~/components/autocomplete/AutocompleteGeoOption";

function placeholderByIndex(idx: number, length: number) {
  if (idx === 0) {
    return "Itinéraire depuis ce lieu";
  } else if (idx === length - 1) {
    return "Itinéraire vers ce lieu";
  }
  return "Point intermédiaire";
}

export default function DirectionTab() {
  const direction = useAppSelector(selectDirection);
  const { wayPoints, optimization, constraints, profile, route } = direction;
  const dispatch = useAppDispatch();
  const { notifyError } = useNotification();
  const { T } = useT();
  const [showSettings, setShowSettings] = useState(false);
  const searchEngine = useAppSelector(selectSearchEngine);

  const viewState = useAppSelector(selectViewState);

  const optimizationOptions = useMemo(
    () => [
      { value: "recommended", label: T("optimization.recommended") },
      { value: "fastest", label: T("optimization.fastest") },
      { value: "shortest", label: T("optimization.shortest") },
    ],
    [T],
  );

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = wayPoints[index].id;
    const feature = selection ? updateId(selection, itemId) : createNodataFeature(itemId);
    const featurePointOrNoData = feature as GeoPointOption | NoDataOption;
    dispatch(directionWayPointChanged({ index, feature: featurePointOrNoData }));
  }

  function handleSortWayPoints(wayPointsUpdated: (GeoOption | NoDataOption)[]) {
    const wayPointPointsUpdated = wayPointsUpdated as (GeoPointOption | NoDataOption)[];
    dispatch(directionWayPointsChanged(wayPointPointsUpdated));
  }

  function handleAppendItem() {
    dispatch(
      directionWayPointInsertAt({
        feature: createNodataFeature(),
        index: wayPoints.length,
      }),
    );
  }

  function handleReset() {
    dispatch(directionWayPointsChanged([createNodataFeature(), createNodataFeature()]));
  }

  const searchEngineOptions = useMemo<StarOption[]>(() => {
    return searchEngines.map((s) => ({
      value: s,
      label: T(`searchEngine.${s}.label`),
      icon: iconBySearchEngine(s),
    }));
  }, [T]);

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex gap-2">
        <Button
          variant="text"
          color="gray"
          className="flex-1 min-w-0 justify-center"
          selected={profile === "car"}
          onClick={() => dispatch(profileChanged("car"))}
        >
          <i className="fe-car"></i>
          {T("profile.car")}
        </Button>
        <Button
          variant="text"
          color="gray"
          className="flex-1 min-w-0 justify-center"
          selected={profile === "bike"}
          onClick={() => dispatch(profileChanged("bike"))}
        >
          <i className="fe-person-biking"></i>
          {T("profile.bike")}
        </Button>
        <Button
          variant="text"
          color="gray"
          className="flex-1 min-w-0 justify-center"
          selected={profile === "pedestrian"}
          onClick={() => dispatch(profileChanged("pedestrian"))}
        >
          <i className="fe-person-walking"></i>
          {T("profile.pedestrian")}
        </Button>
      </div>

      <Steps markerType="bullet" lineStyle="dotted" associateLineWithStep={false}>
        <Sortable
          list={wayPoints}
          setList={handleSortWayPoints}
          animation={200}
          className="ll-sortable"
          handle=".handle"
        >
          {wayPoints.map((wayPoint, index) => (
            <Step
              key={wayPoint.id}
              icon={getIndexLetter(index)}
              status={index < wayPoints.length - 1 ? "done" : "current"}
              markerClassName="handle"
              contentClassName="flex"
            >
              <LazyAutocomplete
                className="flex-1"
                placeholder={placeholderByIndex(index, wayPoints.length)}
                icon={
                  <Select
                    variant="ghost"
                    showArrow={false}
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
                selection={isNoData(wayPoint) ? null : wayPoint}
                debounce={inputSearchDebounceDelay}
                autocompleteOptionComponent={AutocompleteGeoOption}
                onChangeSelection={(selection) => handleChangeSelection(index, selection)}
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
              {wayPoints.length > 2 && (
                <SimpleTooltip
                  content="Supprimer le point"
                  closeDelay={0}
                  placement="top-end"
                  color="yellow"
                >
                  <Button
                    icon
                    variant="ghost"
                    color="gray"
                    onClick={() => dispatch(directionWayPointRemoved(index))}
                  >
                    <i className="fe-cancel"></i>
                  </Button>
                </SimpleTooltip>
              )}
            </Step>
          ))}
        </Sortable>
      </Steps>
      <div className="ll-steps-extra">
        <Button variant="text" color="gray" onClick={handleAppendItem}>
          <span
            className="ll-marker"
            style={{ "--marker-color": "#c0c0c0", "--marker-size": "34px" }}
          >
            <span className="marker">
              <span className="ovale"></span>
              <i className="fe-plus"></i>
            </span>
            <span className="target"></span>
          </span>
          <span>{T("addPoint")}</span>
        </Button>
        <Button variant="text" color="gray" onClick={handleReset}>
          <i className="fe-trash"></i>
          <span>{T("reset")}</span>
        </Button>

        <Button icon variant="text" color="gray" onClick={() => setShowSettings((s) => !s)}>
          <i className="fe-sliders"></i>
        </Button>
      </div>

      {showSettings && (
        <>
          <div className="p8n-setting">
            <div>{T("optimization.title")}</div>
            <div className="min-w-40">
              <Select
                variant="ghost"
                options={optimizationOptions}
                value={optimization}
                onChange={(o) => {
                  const value = (o.target.value || "shortest") as DirectionOptions["optimization"];
                  if (["shortest", "fastest"].includes(value)) {
                    dispatch(optimizationChanged(value));
                  }
                }}
              ></Select>
            </div>
          </div>

          <div className="p8n-setting multiple">
            <div>{T("constraints.avoid")}</div>
            <div className="min-w-40">
              {profile === "car" && (
                <>
                  <Checkbox
                    checked={constraints.avoidTollways}
                    onChange={(e) =>
                      dispatch(constraintChanged({ key: "avoidTollways", value: e.target.checked }))
                    }
                  >
                    <span>{T("constraints.tollways")}</span>
                  </Checkbox>{" "}
                  <Checkbox
                    checked={constraints.avoidHighways}
                    onChange={(e) =>
                      dispatch(constraintChanged({ key: "avoidHighways", value: e.target.checked }))
                    }
                  >
                    <span>{T("constraints.highways")}</span>
                  </Checkbox>
                </>
              )}

              <Checkbox
                checked={constraints.avoidBorders}
                onChange={(e) =>
                  dispatch(constraintChanged({ key: "avoidBorders", value: e.target.checked }))
                }
              >
                <span>{T("constraints.borders")}</span>
              </Checkbox>
            </div>
          </div>
        </>
      )}
      {route && (
        <>
          <div className="p8n-separator"></div>

          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p8n-setting">
                <div>{T("distance")}</div>
                <div>
                  {m2km(route.properties.distance)} <span className="text-gray-6">km</span>
                </div>
              </div>
              <div className="p8n-setting">
                <div>{T("duration")}</div>
                <div>
                  {route.properties.duration > 3600 && (
                    <span>
                      {getHours(route.properties.duration)} <span className="text-gray-6">h</span>
                    </span>
                  )}
                  <span>
                    {getMinutes(route.properties.duration)} <span className="text-gray-6">min</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {route.properties.ascent && (
                <div className="p8n-setting">
                  <div>{T("ascent")}</div>
                  <div>
                    {route.properties.ascent} <span className="text-gray-6">m</span>
                  </div>
                </div>
              )}
              {route.properties.descent && (
                <div className="p8n-setting">
                  <div>{T("descent")}</div>
                  <div>
                    {route.properties.descent} <span className="text-gray-6">m</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
