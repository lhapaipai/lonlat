import { RLayer, RSource } from "maplibre-react-components";

import { useAppSelector } from "~/store";
import {
  isochroneFillLayerStyle,
  isochroneLineLayerStyle,
} from "~/config/mapStyles";
import { selectIsochroneFeature } from "../isochrone/isochroneSlice";

export default function IsochroneMap() {
  const isochroneFeature = useAppSelector(selectIsochroneFeature);

  return (
    <>
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
