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
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import {
  directionWayPointChanged,
  directionWayPointsSorted,
  directionWayPointInsertAt,
  directionWayPointRemoved,
  selectDirectionWayPoints,
} from "./directionSlice";
import {
  AutocompleteGeoOption,
  GeoPointOption,
  createNodataFeature,
  ignSearch,
  isNoData,
  updateId,
} from "pentatrion-geo";
import { selectViewState } from "../store/mapSlice";
import { useNotification } from "pentatrion-design/redux";

function placeholderByIndex(idx: number, length: number) {
  if (idx === 0) {
    return "Itinéraire depuis ce lieu";
  } else if (idx === length - 1) {
    return "Itinéraire vers ce lieu";
  }
  return "Point intermédiaire";
}

export default function DirectionTab() {
  const wayPoints = useAppSelector(selectDirectionWayPoints);
  const dispatch = useAppDispatch();
  const { notifyError } = useNotification();

  const viewState = useAppSelector(selectViewState);

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = wayPoints[index].id;
    const feature = selection ? updateId(selection, itemId) : createNodataFeature(itemId);
    const featurePointOrNoData = feature as GeoPointOption | NoDataOption;
    dispatch(directionWayPointChanged({ index, feature: featurePointOrNoData }));
  }

  function handleSortWayPoints(wayPointsUpdated: (GeoOption | NoDataOption)[]) {
    const wayPointPointsUpdated = wayPointsUpdated as (GeoPointOption | NoDataOption)[];
    dispatch(directionWayPointsSorted(wayPointPointsUpdated));
  }

  function handleRemoveItem(index: number) {
    dispatch(directionWayPointRemoved(index));
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
    <>
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
                    return collection;
                  } catch (err) {
                    notifyError(err);
                    throw err;
                  }
                }}
                autocompleteOptionComponent={AutocompleteGeoOption}
              />
              {wayPoints.length > 2 &&
                (index === 0 ? (
                  <span className="ll-button-placeholder icon"></span>
                ) : (
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
                      onClick={() => handleRemoveItem(index)}
                      style={{
                        visibility: index === 0 ? "hidden" : "visible",
                      }}
                    >
                      <i className="fe-cancel"></i>
                    </Button>
                  </SimpleTooltip>
                ))}
            </Step>
          ))}
        </Sortable>
      </Steps>
      <div className="ll-steps-extra mt-4">
        <Button variant="ghost" color="gray" onClick={handleAppendItem}>
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
          <span>Ajouter un point</span>
        </Button>
      </div>
    </>
  );
}
