import { createContext, useContext } from "react";
import * as maplibre from "maplibre-gl";

export const MapContext = createContext<maplibre.Map | null>(null);

export default function useMapContext() {
  const map = useContext(MapContext);
  if (map === null) {
    throw new Error("useMap must be used inside <RMap>");
  }
  return map;
}
