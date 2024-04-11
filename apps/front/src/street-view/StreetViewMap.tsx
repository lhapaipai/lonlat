import { Event, RLayer, RSource } from "maplibre-react-components";
import { LLPegman, RPegman, googleStreetViewURLTiles } from "pentatrion-geo";
import { useAppDispatch, useAppSelector } from "../store";
import { coordsChanged, selectPegmanCoords, selectPegmanPov } from "./streetViewSlice";

export default function StreetViewMap() {
  const coords = useAppSelector(selectPegmanCoords);
  const { heading } = useAppSelector(selectPegmanPov);
  const dispatch = useAppDispatch();

  function handlePegmanDragEnd(e: Event<LLPegman>) {
    dispatch(coordsChanged(e.target.getLngLat().toArray()));
  }

  return (
    <>
      {coords && (
        <RPegman
          longitude={coords[0]}
          latitude={coords[1]}
          bearing={heading}
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
