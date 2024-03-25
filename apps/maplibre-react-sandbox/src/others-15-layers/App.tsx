import "./App.scss";
import { Layer, Map, MapRef, MapStyle, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import ControlPanel from "./ControlPanel";
import { Map as IMap } from "immutable";
import { Map as LMap } from "maplibre-gl";
import { FeatureCollection, Point } from "geojson";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
const marignier = [6.498, 46.089] as [number, number];

const marignierViewState = {
  longitude: marignier[0],
  latitude: marignier[1],
  zoom: 16,
};

const geojson: FeatureCollection<Point> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: marignier,
      },
      properties: {},
    },
  ],
};
const layer = {
  type: "circle",
  paint: {
    "circle-": "",
  },
};

function App() {
  const [mapStyle, setMapStyle] = useState<IMap<keyof MapStyle, any> | null>(null);
  const map = useRef<MapRef>(null);
  function handleToggle() {
    console.log(map.current);
  }

  return (
    <>
      <Map
        ref={map}
        initialViewState={marignierViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle && mapStyle.toJS()}
      >
        <Source type="geojson" data={geojson}>
          <Layer type="circle" paint={{ "circle-radius": 5 }} id="marignier" />
        </Source>
      </Map>
      <ControlPanel
        onChange={(e) => {
          console.log("onChange");
          setMapStyle(e);
        }}
      />
      <div className="control-panel second">
        <button onClick={handleToggle}>Toggle</button>
      </div>
    </>
  );
}

export default App;
