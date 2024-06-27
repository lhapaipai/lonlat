import { createLonLatGeoOption, isGeolocationGeoOption } from "pentatrion-geo";
import {
  GradientMarker,
  RGradientMarker,
  Event,
} from "maplibre-react-components";

import { searchFeatureChanged, selectSearch } from "./searchSlice";
import { useAppDispatch, useAppSelector } from "~/store";

export default function SearchMap() {
  const dispatch = useAppDispatch();
  const { feature, readOnly } = useAppSelector(selectSearch);

  function handleSearchLocationDragEnd(e: Event<GradientMarker>) {
    const lonlatFeature = createLonLatGeoOption(e.target.getLngLat(), 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  return (
    <>
      {feature && !isGeolocationGeoOption(feature) && (
        <RGradientMarker
          key={feature.id}
          icon={`fe-${feature.properties.type}`}
          draggable={!readOnly}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          onDragEnd={handleSearchLocationDragEnd}
        />
      )}
    </>
  );
}
