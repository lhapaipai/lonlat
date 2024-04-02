import "./App.scss";
import {
  GeoJSONSource,
  Layer,
  Map,
  MapLayerMouseEvent,
  MapRef,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { clusterLabelLayer, clusterLayer, unclusteredPointLayer } from "./layers";
import { useRef } from "react";
import { Feature, GeometryCollection, Point } from "geojson";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
const usa = [-103.6, 40.67] as [number, number];

const usaViewState = {
  longitude: usa[0],
  latitude: usa[1],
  zoom: 3,
};
function App() {
  const mapRef = useRef<RMapRef>(null!);
  const handleClick = async (event: MapLayerMouseEvent) => {
    if (!event.features) {
      console.log("no features");
      return;
    }
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const source = mapRef.current?.getSource("earthquakes") as GeoJSONSource;

    const zoom = await source.getClusterExpansionZoom(clusterId);
    mapRef.current.easeTo({
      center: feature.geometry.coordinates,
      zoom,
      duration: 500,
    });
  };
  return (
    <>
      <RMap
        initialViewState={usaViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
        interactiveLayerIds={[clusterLayer.id]}
        onClick={handleClick}
        ref={mapRef}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data="earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterLabelLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </RMap>
    </>
  );
}

export default App;
