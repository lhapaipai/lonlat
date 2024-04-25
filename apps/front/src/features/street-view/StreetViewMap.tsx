import { Event, RLayer, RSource, useMap } from "maplibre-react-components";
import { LLPegman, RPegman, googleStreetViewURLTiles } from "pentatrion-geo";
import { useAppDispatch, useAppSelector } from "~/store";
import { coordsChanged, selectPegmanCoords, selectPegmanPov } from "./streetViewSlice";
import { Map, MapMouseEvent } from "maplibre-gl";
import { useEffect } from "react";

function getRealBearing(map: Map, streetViewHeading: number) {
  const bearing = map.getBearing();
  return (streetViewHeading - bearing) % 360;
}

export default function StreetViewMap() {
  const coords = useAppSelector(selectPegmanCoords);
  const { heading } = useAppSelector(selectPegmanPov);
  const dispatch = useAppDispatch();

  function handlePegmanDragEnd(e: Event<LLPegman>) {
    dispatch(coordsChanged(e.target.getLngLat().toArray()));
  }

  const map = useMap();

  useEffect(() => {
    function handleMapClick(e: MapMouseEvent) {
      dispatch(coordsChanged(e.lngLat.toArray()));
    }
    map.on("click", handleMapClick);
    return () => void map.off("click", handleMapClick);
  });

  return (
    <>
      {coords && (
        <RPegman
          longitude={coords[0]}
          latitude={coords[1]}
          bearing={getRealBearing(map, heading)}
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
      <RLayer key="streetview-fill" source="streetview-raster" id="streetview-fill" type="raster" />
    </>
  );
}
