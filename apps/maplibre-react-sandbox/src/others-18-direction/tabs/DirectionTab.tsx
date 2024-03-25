import {
  Steps,
  LazyAutocomplete,
  AutocompleteFeatureOption,
  Step,
  Sortable,
  FeatureOption,
  NoDataFeature,
} from "pentatrion-design";
import { handleChangeSearchValue } from "../lib";
import { useAppDispatch, useAppSelector } from "../store";
import {
  directionLocationChanged,
  directionLocationsSorted,
  selectDirectionLocations,
} from "../store/directionSlice";
import { createNodataFeature, isNoData, updateId } from "pentatrion-geo";

export default function DirectionTab() {
  const locations = useAppSelector(selectDirectionLocations);
  const dispatch = useAppDispatch();

  function handleChangeSelection(index: number, selection: FeatureOption | null) {
    const itemId = locations[index].id;
    const feature = selection ? updateId(selection, itemId) : createNodataFeature(itemId);
    dispatch(directionLocationChanged({ index, feature }));
  }

  function handleSortLocations(locationsUpdated: (FeatureOption | NoDataFeature)[]) {
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
                onChangeSearchValueCallback={(search) => handleChangeSearchValue(search)}
                AutocompleteOptionCustom={AutocompleteFeatureOption}
              />
            </Step>
          ))}
        </Sortable>
      </Steps>
    </>
  );
}
