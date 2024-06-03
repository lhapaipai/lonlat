import "../../main.css";
import "~/shared/main.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { GeoJSONSource, LngLatLike, Map, MapGeoJSONFeature } from "maplibre-gl";
import { Feature, FeatureCollection, LineString, Point } from "geojson";
import { length } from "@turf/turf";
const $map = document.getElementById("map")!;
const $distance = document.getElementById("distance") as HTMLDivElement;
const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

let points: Feature<Point>[] = [];

const geojsonLine: FeatureCollection<LineString> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
      properties: {},
    },
  ],
};

const geojsonPoints: FeatureCollection<Point> = {
  type: "FeatureCollection",
  features: [],
};

map.on("load", () => {
  map.addSource("line", {
    type: "geojson",
    data: geojsonLine,
  });
  map.addSource("points", {
    type: "geojson",
    data: geojsonPoints,
  });

  map.addLayer({
    id: "measure-points",
    type: "circle",
    source: "points",
    paint: {
      "circle-radius": 5,
      "circle-color": "#000",
    },
    filter: ["in", "$type", "Point"],
  });

  map.addLayer({
    id: "measure-lines",
    type: "line",
    source: "line",
    paint: {
      "line-color": "#000",
      "line-width": 2.5,
    },
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    filter: ["in", "$type", "LineString"],
  });

  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["measure-points"],
    });

    $distance.innerText = "";

    if (features.length) {
      const id = features[0].properties.id;

      points = points.filter((point) => {
        return point.properties?.id !== id;
      });
    } else {
      const point: Feature<Point> = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [e.lngLat.lng, e.lngLat.lat],
        },
        properties: {
          id: String(new Date().getTime()),
        },
      };

      points.push(point);
    }

    geojsonLine.features[0].geometry.coordinates =
      points.length >= 2 ? points.map((point) => point.geometry.coordinates) : [];

    geojsonPoints.features = points;

    (map.getSource("line") as GeoJSONSource).setData(geojsonLine);
    (map.getSource("points") as GeoJSONSource).setData(geojsonPoints);

    if (points.length >= 2) {
      const distanceValue = length(geojsonLine.features[0]);
      $distance.innerText = `distance: ${Math.round(100 * distanceValue) / 100}km`;
    }
  });

  map.on("mousemove", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["measure-points"],
    });

    map.getCanvas().style.cursor = features.length ? "pointer" : "crosshair";
  });
});
