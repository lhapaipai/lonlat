import { LLMarker, RLLMarker, createLonLatFeaturePoint } from "pentatrion-geo";
import { Event } from "maplibre-react-components";

import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import { useAppDispatch, useAppSelector } from "../store";

export default function SearchMap() {
  const dispatch = useAppDispatch();
  const searchFeature = useAppSelector(selectSearchFeature);

  function handleSearchLocationDragEnd(e: Event<LLMarker>) {
    const lonlatFeature = createLonLatFeaturePoint(e.target.getLngLat(), 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  return (
    <>
      {searchFeature?.geometry.type === "Point" && (
        <RLLMarker
          key={searchFeature.properties.id}
          icon="fe-star"
          draggable={true}
          longitude={searchFeature.geometry.coordinates[0]}
          latitude={searchFeature.geometry.coordinates[1]}
          onDragEnd={handleSearchLocationDragEnd}
        />
      )}
    </>
  );
}
