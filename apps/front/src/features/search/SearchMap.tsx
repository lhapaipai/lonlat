import {
  createLonLatFeaturePoint,
  isGeolocationGeoOption,
} from "pentatrion-geo";
import {
  GradientMarker,
  RGradientMarker,
  Event,
  RLayer,
  RSource,
} from "maplibre-react-components";

import { searchFeatureChanged, selectSearchFeature } from "./searchSlice";
import { useAppDispatch, useAppSelector } from "~/store";
import {
  isochroneFillLayerStyle,
  isochroneLineLayerStyle,
} from "~/config/mapStyles";
import { selectIsochroneFeature } from "../isochrone/isochroneSlice";

export default function SearchMap() {
  const dispatch = useAppDispatch();
  const searchFeature = useAppSelector(selectSearchFeature);
  const isochroneFeature = useAppSelector(selectIsochroneFeature);

  function handleSearchLocationDragEnd(e: Event<GradientMarker>) {
    const lonlatFeature = createLonLatFeaturePoint(e.target.getLngLat(), 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  return (
    <>
      {searchFeature && !isGeolocationGeoOption(searchFeature) && (
        <RGradientMarker
          key={searchFeature.id}
          icon={`fe-${searchFeature.properties.type}`}
          draggable={true}
          longitude={searchFeature.geometry.coordinates[0]}
          latitude={searchFeature.geometry.coordinates[1]}
          onDragEnd={handleSearchLocationDragEnd}
        />
      )}
      {isochroneFeature && (
        <>
          <RSource
            id="search-isochrone"
            key="search-isochrone"
            type="geojson"
            data={isochroneFeature}
          />
          <RLayer
            id="search-isochrone-fill"
            key="search-isochrone-fill"
            type="fill"
            source="search-isochrone"
            {...isochroneFillLayerStyle}
          />
          <RLayer
            id="search-isochrone-line"
            key="search-isochrone-line"
            type="line"
            source="search-isochrone"
            {...isochroneLineLayerStyle}
          />
        </>
      )}
    </>
  );
}
