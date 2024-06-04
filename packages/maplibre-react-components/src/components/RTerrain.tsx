import { useContext, useEffect, useRef, useState } from "react";
import { mapLibreContext } from "..";
import { TerrainSpecification } from "maplibre-gl";

type RTerrainProps = TerrainSpecification;

function RTerrain(props: RTerrainProps) {
  const { ...terrainOptions } = props;

  const context = useContext(mapLibreContext);
  const map = context.mapManager.map;

  const prevPropsRef = useRef(props);

  const [, setVersion] = useState(0);

  useEffect(() => {
    const reRender = () => setVersion((v) => v + 1);
    map.on("terrain", reRender);

    if (map.style._loaded) {
      // in case layer is loaded between first render and useEffect call
      // like RSource
      reRender();
    }

    return () => {
      map.off("terrain", reRender);
      if (map.style && map.style._loaded && map.getTerrain()) {
        map.setTerrain(null);
      }
      context.controlledTerrain = false;
    };
  }, [map, context]);

  // when map not loaded getTerrain return null event if map style contain terrain
  // specification.
  let terrain = map.style && map.getSource(props.source) && map.getTerrain();

  if (terrain) {
    const prevOptions = prevPropsRef.current;
    if (
      prevOptions.exaggeration !== terrainOptions.exaggeration ||
      prevOptions.source !== terrainOptions.source
    ) {
      map.setTerrain(terrainOptions);
    }
  } else {
    if (map.style && map.style._loaded) {
      console.log("setTerrain");
      map.setTerrain(terrainOptions);
      terrain = terrainOptions;
      context.controlledTerrain = true;
    }
  }

  prevPropsRef.current = props;

  return null;
}

export default RTerrain;
