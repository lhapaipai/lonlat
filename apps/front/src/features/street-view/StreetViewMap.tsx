import { Event, RLayer, RSource, useMap } from "maplibre-react-components";
import { Pegman, RPegman } from "pentatrion-geo/maplibre";
import { googleStreetViewURLTiles } from "pentatrion-geo/api";
import { useAppDispatch, useAppSelector } from "~/store";
import {
  coordsChanged,
  selectPegmanCoords,
  selectPegmanPov,
} from "./streetViewSlice";
import { MapMouseEvent } from "maplibre-gl";
import { memo, useEffect } from "react";
import { selectViewState } from "~/features/map/mapSlice";

function StreetViewMap() {
  const coords = useAppSelector(selectPegmanCoords);
  const { heading: streetViewHeading } = useAppSelector(selectPegmanPov);
  const dispatch = useAppDispatch();
  const { bearing: mapBearing } = useAppSelector(selectViewState);
  function handlePegmanDragEnd(e: Event<Pegman>) {
    dispatch(coordsChanged(e.target.getLngLat().toArray()));
  }

  const map = useMap();

  useEffect(() => {
    function handleMapClick(e: MapMouseEvent) {
      dispatch(coordsChanged(e.lngLat.toArray()));
    }
    map.on("click", handleMapClick);
    return () => void map.off("click", handleMapClick);
  }, [map, dispatch]);

  const pegmanBearing = (streetViewHeading - mapBearing) % 360;

  return (
    <>
      {coords && (
        <RPegman
          longitude={coords[0]}
          latitude={coords[1]}
          bearing={pegmanBearing}
          draggable={true}
          onDragEnd={handlePegmanDragEnd}
        />
      )}
      <RSource
        id="streetview-raster"
        key="streetview-trace"
        type="raster"
        tiles={googleStreetViewURLTiles}
        tileSize={256}
      />
      <RLayer
        key="streetview-fill"
        source="streetview-raster"
        id="streetview-fill"
        type="raster"
      />
    </>
  );
}

export default memo(StreetViewMap);
