import { createLonLatGeoOption } from "pentatrion-geo";
import { Event, RMarker } from "maplibre-react-components";
import { Marker } from "maplibre-gl";

import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import { useAppDispatch, useAppSelector } from "../store";

export default function SearchMap() {
  const dispatch = useAppDispatch();
  const searchFeature = useAppSelector(selectSearchFeature);

  function handleSearchLocationDragEnd(e: Event<Marker>) {
    const lonlatFeature = createLonLatGeoOption(e.target.getLngLat(), 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  return (
    <>
      {searchFeature?.type == "Feature" &&
        searchFeature.geometry.type === "Point" && (
          <RMarker
            key={searchFeature.id}
            draggable={true}
            longitude={searchFeature.geometry.coordinates[0]}
            latitude={searchFeature.geometry.coordinates[1]}
            onDragEnd={handleSearchLocationDragEnd}
          />
        )}
    </>
  );
}
