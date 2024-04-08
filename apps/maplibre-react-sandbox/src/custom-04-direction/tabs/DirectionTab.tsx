import {
  Steps,
  LazyAutocomplete,
  Step,
  Sortable,
  GeoOption,
  NoDataOption,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "../store";
import {
  directionLocationChanged,
  directionLocationsSorted,
  selectDirectionLocations,
} from "../store/directionSlice";
import {
  AutocompleteGeoOption,
  createNodataFeature,
  ignSearch,
  isNoData,
  parseIgnAddressCollection,
  updateId,
} from "pentatrion-geo";
import { selectViewState } from "../store/mapSlice";

export default function DirectionTab() {
  const locations = useAppSelector(selectDirectionLocations);
  const dispatch = useAppDispatch();

  const viewState = useAppSelector(selectViewState);

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = locations[index].id;
    const feature = selection ? updateId(selection, itemId) : createNodataFeature(itemId);
    dispatch(directionLocationChanged({ index, feature }));
  }

  function handleSortLocations(locationsUpdated: (GeoOption | NoDataOption)[]) {
    dispatch(directionLocationsSorted(locationsUpdated));
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
              icon={index + 1}
              status={index < locations.length - 1 ? "done" : "current"}
              markerClassName="handle"
            >
              <LazyAutocomplete
                placeholder="Search a location..."
                icon={false}
                selection={isNoData(location) ? null : location}
                debounce={50}
                onChangeSelection={(selection) => handleChangeSelection(index, selection)}
                onChangeSearchValueCallback={async (searchValue) => {
                  const collection = await ignSearch(searchValue, viewState.center);
                  return parseIgnAddressCollection(collection);
                }}
                AutocompleteOptionCustom={AutocompleteGeoOption}
              />
            </Step>
          ))}
        </Sortable>
      </Steps>
    </>
  );
}
