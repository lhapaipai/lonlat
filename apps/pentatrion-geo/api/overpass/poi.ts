import { PoiGeoOption, RouteFeatureResponse } from "../../types";
import { fetchOverpassAPI, overpassServiceUrl } from "./config";
import { lineString, point } from "@turf/helpers";
import { along } from "@turf/along";
import { length } from "@turf/length";
import { nearestPointOnLine } from "@turf/nearest-point-on-line";
import { APISchemas } from "./api";
import { customRound } from "../../geo-options";
import { isNotNull, simplifyCoords } from "../../lib";
import { nanoid } from "nanoid";
import { Position } from "geojson";

/**
 * for calibration see : src/mrc-lonlat/13-pois
 */
const routeSimplificationTolerance = 0.005;
const routeAlongIntervalInMeters = 1500;
const placeAroundCircleRadius = 1000;
const peakAroundCircleRadius = 500;

export function generatePoisQuery(route: RouteFeatureResponse) {
  const maximaPoints =
    route.properties?.maxima?.map(
      (idx: number) => route.geometry.coordinates[idx],
    ) || [];

  const maximaQL = maximaPoints.map(
    (coords) =>
      `node(around:${peakAroundCircleRadius},${coords[1]}, ${coords[0]})[natural~"^(peak)$"];`,
  );

  const simplifiedCoords = simplifyCoords(
    route.geometry.coordinates,
    routeSimplificationTolerance,
  );
  const simplifiedLine = lineString(simplifiedCoords);

  const routePoints: Position[] = [route.geometry.coordinates[0]];

  let distance: number = routeAlongIntervalInMeters;
  const simplifiedRouteLength = length(simplifiedLine, { units: "meters" });
  while (distance < simplifiedRouteLength) {
    const point = along(simplifiedLine, distance, { units: "meters" });
    routePoints.push(point.geometry.coordinates);
    distance += routeAlongIntervalInMeters;
  }
  routePoints.push(
    route.geometry.coordinates[route.geometry.coordinates.length - 1],
  );

  const alongQl = routePoints.map(
    (coords) =>
      `node(around:${placeAroundCircleRadius},${coords[1]}, ${coords[0]})[place~"^(city|town|village)$"];`,
  );

  const query = `[timeout:10][out:json];\n\n(\n${alongQl.join("\n")}\n\n${maximaQL.join("\n")}\n); out;`;

  return query;
}

export async function fetchOverpassPois(
  route: RouteFeatureResponse,
  serviceUrl = overpassServiceUrl,
): Promise<PoiGeoOption[]> {
  const query = generatePoisQuery(route);

  const json = await fetchOverpassAPI(
    "/api/interpreter",
    {
      method: "post",
      body: {
        data: query,
      },
    },
    serviceUrl,
  );

  // if query error returned content is html string
  if (typeof json === "string" || !Array.isArray(json.elements)) {
    return [];
  }

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
