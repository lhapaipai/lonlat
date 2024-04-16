import {
  Steps,
  LazyAutocomplete,
  Step,
  Sortable,
  GeoOption,
  NoDataOption,
  Button,
  getIndexLetter,
  SimpleTooltip,
  Checkbox,
  Select,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import {
  directionWayPointChanged,
  directionWayPointsChanged,
  directionWayPointInsertAt,
  directionWayPointRemoved,
  selectDirection,
  optimizationChanged,
  profileChanged,
  permissionChanged,
} from "./directionSlice";
import {
  AutocompleteGeoOption,
  DirectionOptions,
  GeoPointOption,
  createNodataFeature,
  ignSearch,
  isNoData,
  parseIgnAddressCollection,
  updateId,
} from "pentatrion-geo";
import { selectViewState } from "../store/mapSlice";
import { useNotification } from "pentatrion-design/redux";
import { useT } from "talkr";
import { useMemo, useState } from "react";

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
  const { wayPoints, optimization, permissions, profile } = direction;
  const dispatch = useAppDispatch();
  const { notifyError } = useNotification();
  const { T } = useT();
  const [showSettings, setShowSettings] = useState(false);

  const viewState = useAppSelector(selectViewState);

  const optimizationOptions = useMemo(
    () => [
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

  return (
    <div className="ll-quick-settings">
      <div className="actions">
        <Button
          variant="light"
          color="weak"
          className="with-icon"
          selected={profile === "car"}
          onClick={() => dispatch(profileChanged("car"))}
        >
          <i className="fe-car"></i>
          {T("profile.car")}
        </Button>
        <Button
          variant="light"
          color="weak"
          className="with-icon"
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
                placeholder={placeholderByIndex(index, wayPoints.length)}
                icon={false}
                selection={isNoData(wayPoint) ? null : wayPoint}
                debounce={50}
                onChangeSelection={(selection) => handleChangeSelection(index, selection)}
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
              {wayPoints.length > 2 &&
                (index === 0 ? (
                  <span className="ll-button-placeholder icon"></span>
                ) : (
                  <SimpleTooltip
                    content="Supprimer le point"
                    closeDelay={0}
                    placement="top-end"
                    color="primary"
                  >
                    <Button
                      icon
                      variant="ghost"
                      color="weak"
                      onClick={() => dispatch(directionWayPointRemoved(index))}
                    >
                      <i className="fe-cancel"></i>
                    </Button>
                  </SimpleTooltip>
                ))}
            </Step>
          ))}
        </Sortable>
      </Steps>
      <div className="ll-steps-extra">
        <Button variant="ghost" color="weak" onClick={handleAppendItem}>
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
        <Button icon variant="text" color="weak" onClick={() => setShowSettings((s) => !s)}>
          <i className="fe-settings"></i>
        </Button>
      </div>

      {showSettings && (
        <>
          <div className="setting">
            <div>Mode de calcul</div>
            <div>
              <Select
                variant="ghost"
                options={optimizationOptions}
                value={optimization}
                onChange={(o) => {
                  const value = (o.target.value || "shortest") as DirectionOptions["optimization"];
                  if (["shortest", "fastest"].includes(value)) {
                    dispatch(optimizationChanged(value));
                  }

                  // @ts-ignore
                  // setOptimization(o.target.value);
                }}
              ></Select>
            </div>
          </div>

          <div className="setting constraints">
            <div>{T("permissions.title")}</div>
            <div className="ll-input-checkbox-container placement-block">
              <Checkbox
                checked={permissions.highway}
                onChange={(e) =>
                  dispatch(permissionChanged({ key: "highway", value: e.target.checked }))
                }
              >
                <span>{T("permissions.highway")}</span>
              </Checkbox>
              <Checkbox
                checked={permissions.bridge}
                onChange={(e) =>
                  dispatch(permissionChanged({ key: "bridge", value: e.target.checked }))
                }
              >
                <span>{T("permissions.bridge")}</span>
              </Checkbox>
              <Checkbox
                checked={permissions.tunnel}
                onChange={(e) =>
                  dispatch(permissionChanged({ key: "tunnel", value: e.target.checked }))
                }
              >
                <span>{T("permissions.tunnel")}</span>
              </Checkbox>
            </div>
          </div>
        </>
      )}

      <div className="separator"></div>

      <div>
        <div className="setting">
          <div>Distance</div>
          <div>
            325 <span className="text-hint">km</span>
          </div>
        </div>
        <div className="setting">
          <div>Durée</div>
          <div>3h 25min</div>
        </div>
      </div>
    </div>
  );
}
