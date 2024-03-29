import "./App.scss";
import { ControlPosition, Map, useControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import MapboxDraw, {
  DrawDeleteEvent,
  DrawUpdateEvent,
  MapboxDrawOptions,
} from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useCallback, useState } from "react";
import { Feature } from "geojson";
import ControlPanel from "./ControlPanel";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
const marignier = [6.498, 46.089] as [number, number];

interface DrawControlProps extends MapboxDrawOptions {
  position: ControlPosition;

  onCreate?: (evt: { features: Feature[] }) => void;
  onUpdate?: (evt: { features: Feature[]; action: string }) => void;
  onDelete?: (evt: { features: Feature[] }) => void;
}

MapboxDraw.constants.classes.CONTROL_BASE = "maplibregl-ctrl";
MapboxDraw.constants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
MapboxDraw.constants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";

function DrawControl({ position, onCreate, onUpdate, onDelete, ...props }: DrawControlProps) {
  useControl(
    () => new MapboxDraw(props),
    ({ map }) => {
      onCreate && map.on("draw.create", onCreate);
      onUpdate && map.on("draw.update", onUpdate);
      onDelete && map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      onCreate && map.off("draw.create", onCreate);
      onUpdate && map.off("draw.update", onUpdate);
      onDelete && map.off("draw.delete", onDelete);
    },
    {
      position,
    },
  );

  return null;
}

const marignierViewState = {
  longitude: marignier[0],
  latitude: marignier[1],
  zoom: 16,
};
function App() {
  const [features, setFeatures] = useState({});
  const handleUpdate = useCallback((e: DrawUpdateEvent) => {
    setFeatures((curFeatures) => {
      const newFeatures = { ...curFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);
  const handleDelete = useCallback((e: DrawDeleteEvent) => {
    setFeatures((curFeatures) => {
      const newFeatures = { ...curFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <>
      <Map
        initialViewState={marignierViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/styles/ign/PLAN.IGN/standard-geopf.json"
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{ polygon: true, trash: true }}
          defaultMode="draw_polygon"
          onCreate={handleUpdate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Map>
      <ControlPanel polygons={Object.values(features)} />
    </>
  );
}

export default App;
