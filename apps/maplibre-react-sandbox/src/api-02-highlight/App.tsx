import "./App.scss";
import { Layer, Map, MapLayerMouseEvent, Popup, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useMemo, useState } from "react";
import { countiesLayer, highlightLayer } from "./mapStyles";




const france = [3, 46.7] as [number, number];

const franceViewState = {
  longitude: france[0],
  latitude: france[1],
  zoom: 4,
};

interface HoverInfo {
  longitude: number;
  latitude: number;
  townName?: string;
}

const style = {
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
        initialViewState={franceViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={style}
        onMouseMove={onHover}
        interactiveLayerIds={["counties"]}
      >
        <Source type="vector" url="http://0.0.0.0:3000/commune">
          <Layer {...countiesLayer} />
          <Layer {...highlightLayer} filter={filter} />
        </Source>
        {selectedCounty && hoverInfo && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            offset={[0, -10] as [number, number]}
            closeButton={false}
            className="county-info"
          >
            {selectedCounty}
          </Popup>
        )}
      </RMap>
    </>
  );
}

export default App;
