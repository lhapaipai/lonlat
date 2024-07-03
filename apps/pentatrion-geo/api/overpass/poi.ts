import { PoiGeoOption, RouteFeatureResponse } from "types";
// import { fetchOverpassAPI } from "./config";
import { point } from "@turf/helpers";
import { nearestPointOnLine } from "@turf/nearest-point-on-line";
import { poiResponse } from "./_mock";
import { APISchemas } from "./api";
import { customRound } from "geo-options";
import { isNotNull } from "lib";
import { nanoid } from "nanoid";
import { Position } from "geojson";

export async function fetchPois(
  route: RouteFeatureResponse,
): Promise<PoiGeoOption[]> {
  // const minimaPoints = route.properties.minima.map(
  //   (idx) => route.geometry.coordinates[idx],
  // );
  // const maximaPoints = route.properties.maxima.map(
  //   (idx) => route.geometry.coordinates[idx],
  // );

  // const minimaQL = minimaPoints.map(
  //   (coords) =>
  //     `node(around:500,${coords[1]}, ${coords[0]})[place~"^(city|town|village)$"];`,
  // );
  // const maximaQL = maximaPoints.map(
  //   (coords) =>
  //     `node(around:500,${coords[1]}, ${coords[0]})[natural~"^(peak)$"];`,
  // );
  // const query = `[timeout:10][out:json]; (${minimaQL.join("")}${maximaQL.join("")}); out;`;

  // const json = await fetchOverpassAPI("/api/interpreter", {
  //   method: "post",
  //   body: {
  //     data: query,
  //   },
  // });
  const json = poiResponse;
  console.log(json);

  const pois = json.elements
    .map((element) => {
      if (element.type !== "node") {
        return null;
      }

      const featurePoint = point([element.lon, element.lat]);
      const snappedPoint = nearestPointOnLine(route, featurePoint);

      /**
       * snappedPoint.geometry.coordinates can have lost altitude and distance
       */
      const snappedPointCoords =
        route.geometry.coordinates[snappedPoint.properties.index];

      /**
       * we query overpass API with around at 500 meters because we are not sure of
       * the precision of the minima, maxima
       *
       * with nearestPointOnLine we verify the distance with better accuracy. if
       * there is no point at a minimum distance of 300 meters, we think that the
       * POI is not relevant
       */
      if (snappedPoint.properties.dist > 0.3) {
        return null;
      }

      return createPoiGeoOption(element, snappedPointCoords);
    })
    .filter(isNotNull);

  return pois;
}

export function createPoiGeoOption(
  element: APISchemas["NodeElement"],
  snappedPointCoords: Position,
  id?: string,
): PoiGeoOption | null {
  const { lon, lat, id: overpassId } = element;
  const lngRounded = customRound(lon, 4);
  const latRounded = customRound(lat, 4);

  const name =
    element.tags.name ?? `longitude: ${lngRounded}, latitude: ${latRounded}`;

  return {
    id: id ?? nanoid(),
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: element.tags.ele
        ? [
            lon,
            lat,
            // precision is better
            parseInt(element.tags.ele),
            snappedPointCoords[3],
          ]
        : [lon, lat, snappedPointCoords[2], snappedPointCoords[3]],
    },
    properties: {
      id: `overpass-${overpassId}`,
      type: getType(element.tags),
      name,
      context: null,
      label: name,
      score: 1,
      originalProperties: element.tags,
    },
  };
}

function getType(tags: { [key: string]: string }) {
  if (tags.place) {
    switch (tags.place) {
      case "city":
      case "town":
        return "locality";
      case "village":
      case "borough":
      case "suburb":
      case "quarter":
      case "neighbourhood":
      case "city_block":
      case "plot":
        return "locality";

      default:
        return "locality";
    }
  } else if (tags.natural) {
    switch (tags.natural) {
      case "peak":
      case "hill":
        return "summit";
      case "saddle": // col
        return "pass";

      default:
        return "star";
    }
    return tags.natural;
  }

  return "star";
}
