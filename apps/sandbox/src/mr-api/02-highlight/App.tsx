import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useMemo, useState } from "react";
import { countiesLayer, highlightLayer } from "./mapStyles";
import { RLayer, RMap, RPopup, RSource } from "maplibre-react-components";
import { MapLayerMouseEvent, StyleSpecification } from "maplibre-gl";

const france = [3, 46.7] as [number, number];

interface HoverInfo {
  longitude: number;
  latitude: number;
  townName?: string;
}

const style: StyleSpecification = {
  version: 8,
  name: "PLAN IGN",
  glyphs: "https://wxs.ign.fr/static/vectorTiles/fonts/{fontstack}/{range}.pbf",
  sprite: "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/sprite/PlanIgn",
  sources: {},
  transition: {
    duration: 300,
    delay: 0,
  },
  layers: [],
};

function App() {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const town = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      townName: town && town.properties.nom_m,
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.townName) || "";
  const filter: ["in", string, string] = useMemo(
    () => ["in", "nom_m", selectedCounty],
    [selectedCounty],
  );

  return (
    <>
      <RMap
        initialCenter={france}
        initialZoom={4}
        style={{ width: "100%", height: "100%" }}
        mapStyle={style}
        onMouseMove={onHover}
        interactiveLayerIds={["counties"]}
      >
        <RSource id="counties" type="vector" url="http://0.0.0.0:3000/commune" />
        <RLayer {...countiesLayer} />
        <RLayer {...highlightLayer} filter={filter} />
        {selectedCounty && hoverInfo && (
          <RPopup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            offset={[0, -10] as [number, number]}
            className="county-info"
          >
            {selectedCounty}
          </RPopup>
        )}
      </RMap>
    </>
  );
}

export default App;
