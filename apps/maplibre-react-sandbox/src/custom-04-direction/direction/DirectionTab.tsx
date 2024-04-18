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
  directionLocationChanged,
  directionLocationsSorted,
  directionLocationInsertAt,
  directionLocationRemoved,
  selectDirectionLocations,
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
  const locations = useAppSelector(selectDirectionLocations);
  const dispatch = useAppDispatch();
  const { notifyError } = useNotification();

  const viewState = useAppSelector(selectViewState);

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = locations[index].id;
    const feature = selection ? updateId(selection, itemId) : createNodataFeature(itemId);
    const featurePointOrNoData = feature as GeoPointOption | NoDataOption;
    dispatch(directionLocationChanged({ index, feature: featurePointOrNoData }));
  }

  function handleSortLocations(locationsUpdated: (GeoOption | NoDataOption)[]) {
    const locationPointsUpdated = locationsUpdated as (GeoPointOption | NoDataOption)[];
    dispatch(directionLocationsSorted(locationPointsUpdated));
  }

  function handleRemoveItem(index: number) {
    dispatch(directionLocationRemoved(index));
  }

  function handleAppendItem() {
    dispatch(
      directionLocationInsertAt({
        feature: createNodataFeature(),
        index: locations.length,
      }),
    );
  }

  return (
    <>
      <Steps markerType="bullet" lineStyle="dotted" associateLineWithStep={false}>
        <Sortable
          list={locations}
          setList={handleSortLocations}
          animation={200}
          className="ll-sortable"
          handle=".handle"
        >
          {locations.map((location, index) => (
            <Step
              key={location.id}
              icon={getIndexLetter(index)}
              status={index < locations.length - 1 ? "done" : "current"}
              markerClassName="handle"
              contentClassName="flex"
            >
              <LazyAutocomplete
                placeholder={placeholderByIndex(index, locations.length)}
                icon={false}
                selection={isNoData(location) ? null : location}
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
              {locations.length > 2 &&
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
          <span>Ajouter un point</span>
        </Button>
      </div>
    </>
  );
}
