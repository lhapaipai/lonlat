import { Map } from "maplibre-gl";
import { createContext } from "react";

export type MapLibreContext = {
  map: Map;
  controlledSources: string[];
  controlledLayers: string[];
  controlledTerrain: boolean;
};

export const mapLibreContext = createContext<MapLibreContext>({
  map: null!,
  controlledSources: [],
  controlledLayers: [],
  controlledTerrain: false,
});
