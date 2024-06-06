import { createContext } from "react";
import MapManager from "./lib/MapManager";

export type MapLibreContext = {
  mapManager?: MapManager;
  controlledSources: string[];
  controlledLayers: string[];
  controlledTerrain: boolean;
};

export const mapLibreContext = createContext<MapLibreContext>({
  mapManager: undefined,
  controlledSources: [],
  controlledLayers: [],
  controlledTerrain: false,
});
