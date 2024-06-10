import {
  Steps,
  LazyAutocomplete,
  Step,
  GeoOption,
  NoDataOption,
  Sortable,
} from "pentatrion-design";
import { handleChangeSearchValue } from "../lib";
import { useAppDispatch, useAppSelector } from "../store";
import {
  directionLocationChangedAction,
  directionLocationsSorted,
  selectDirectionLocations,
} from "../store/directionSlice";
import {
  createNodataFeature,
  isNoData,
  updateId,
  AutocompleteGeoOption,
} from "pentatrion-geo";

export default function DirectionTab() {
  // issue with ReactSortable and redux
  // ReactSortable mutate SortableItem.
  const locations = useAppSelector(selectDirectionLocations);
  const dispatch = useAppDispatch();

  console.log(locations);

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = locations[index].id;
    const feature = selection
      ? updateId(selection, itemId)
      : createNodataFeature(itemId);

    dispatch(directionLocationChangedAction({ index, feature }));
  }

  function handleSortLocations(locationsUpdated: (GeoOption | NoDataOption)[]) {
    dispatch(directionLocationsSorted(locationsUpdated));
  }

  return (
    <>
      <Steps
        markerType="bullet"
        lineStyle="dotted"
        associateLineWithStep={false}
      >
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
                icon={false /* @ts-ignore */}
                selection={isNoData(location) ? null : location}
                debounce={50}
                onChangeSelection={(selection) =>
                  handleChangeSelection(index, selection)
                }
                onChangeSearchValueCallback={(search) =>
                  handleChangeSearchValue(search)
                }
                autocompleteOptionComponent={AutocompleteGeoOption}
              />
            </Step>
          ))}
        </Sortable>
      </Steps>
    </>
  );
}
