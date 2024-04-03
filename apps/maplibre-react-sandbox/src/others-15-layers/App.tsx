import "./App.scss";
import { Layer, Map, MapRef, MapStyle, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import ControlPanel from "./ControlPanel";
import { Map as IMap } from "immutable";
import { Map as LMap } from "maplibre-gl";
import { FeatureCollection, Point } from "geojson";




const marignier = { lng: 6.498, lat: 46.089 };



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
  const map = useRef<RMapRef>(null);
  function handleToggle() {
    console.log(map.current);
  }

  return (
    <>
      <RMap
        ref={map}
        initialCenter={marignier}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle && mapStyle.toJS()}
      >
        <Source type="geojson" data={geojson}>
          <Layer type="circle" paint={{ "circle-radius": 5 }} id="marignier" />
        </Source>
      </RMap>
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
