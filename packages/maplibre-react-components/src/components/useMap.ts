import { Map } from "maplibre-gl";
import { createContext, useContext } from "react";

export const MapContext = createContext<Map | null>(null);

export default function useMap() {
  const context = useContext(MapContext);

  if (context === null) {
    throw new Error("use useMap in components inside <RMap />");
  }

  return context;
}
