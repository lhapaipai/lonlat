import { useContext, useEffect, useRef, useState } from "react";
import { mapLibreContext } from "../context";
import { TerrainSpecification } from "maplibre-gl";

type RTerrainProps = TerrainSpecification;

export const RTerrain = (props: RTerrainProps) => {
  const terrainOptions = props;

  const context = useContext(mapLibreContext);
  const map = context.mapManager?.map;

  if (!map) {
    throw new Error("use <RTerrain /> component inside <RMap />");
  }

  const prevPropsRef = useRef(props);

  const [, setVersion] = useState(0);

  useEffect(() => {
    const reRender = () => void setVersion((v) => v + 1);

    if (map.style._loaded) {
      // in case layer is loaded between first render and useEffect call
      // like RSource
      reRender();
    }

    return () => {
      if (map.style?._loaded && map.getTerrain()) {
        map.setTerrain(null);
      }
      context.controlledTerrain = false;
    };
  }, [map, context]);

  // when map not loaded getTerrain return null event if map style contain terrain
  // specification.
  const terrain = map.style?._loaded && map.getSource(terrainOptions.source) && map.getTerrain();

  if (terrain) {
    const prevOptions = prevPropsRef.current;
    if (
      prevOptions.exaggeration !== terrainOptions.exaggeration ||
      prevOptions.source !== terrainOptions.source
    ) {
      map.setTerrain(terrainOptions);
    }
  } else if (map.style?._loaded) {
    if (map.getSource(terrainOptions.source)) {
      console.log("setTerrain");
      map.setTerrain(terrainOptions);
      context.controlledTerrain = true;
    } else {
      throw new Error(`Unable to find Terrain source ${terrainOptions.source}`);
    }
  }

  prevPropsRef.current = props;

  return null;
};
