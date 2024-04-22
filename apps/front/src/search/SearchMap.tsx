import { LLMarker, RLLMarker, createLonLatFeaturePoint } from "pentatrion-geo";
import { Event, RLayer, RSource } from "maplibre-react-components";

import { searchFeatureChanged, selectIsochrone, selectSearchFeature } from "./searchSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { isochroneFillLayerStyle, isochroneLineLayerStyle } from "~/config/mapStyles";

export default function SearchMap() {
  const dispatch = useAppDispatch();
  const searchFeature = useAppSelector(selectSearchFeature);
  const isochrone = useAppSelector(selectIsochrone);

  function handleSearchLocationDragEnd(e: Event<LLMarker>) {
    const lonlatFeature = createLonLatFeaturePoint(e.target.getLngLat(), 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  return (
    <>
      {searchFeature?.geometry.type === "Point" && (
        <RLLMarker
          key={searchFeature.properties.id}
          icon={`fe-${searchFeature.properties.type}`}
          draggable={true}
          longitude={searchFeature.geometry.coordinates[0]}
          latitude={searchFeature.geometry.coordinates[1]}
          onDragEnd={handleSearchLocationDragEnd}
        />
      )}
      {isochrone && (
        <>
          <RSource id="search-isochrone" key="search-isochrone" type="geojson" data={isochrone} />
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
