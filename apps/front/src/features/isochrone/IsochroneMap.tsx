import { RGradientMarker, RLayer, RSource } from "maplibre-react-components";

import { RootState, useAppSelector } from "~/store";
import {
  isochroneFillLayerStyle,
  isochroneLineLayerStyle,
} from "~/config/mapStyles";
import {
  selectIsochroneFeature,
  selectIsochroneReferenceFeature,
} from "../isochrone/isochroneSlice";

export default function IsochroneMap() {
  const isochroneFeature = useAppSelector(selectIsochroneFeature);
  const referenceFeature = useAppSelector(selectIsochroneReferenceFeature);
  const costType = useAppSelector(
    (state: RootState) => state.isochrone.costType,
  );

  return (
    <>
      {referenceFeature && (
        <RGradientMarker
          key={referenceFeature.id}
          icon={costType === "time" ? "fe-stopwatch" : "fe-ruler"}
          longitude={referenceFeature.geometry.coordinates[0]}
          latitude={referenceFeature.geometry.coordinates[1]}
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
