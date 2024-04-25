import { fetchAPI } from "pentatrion-design";
import { APIPaths, APIRequests, APIResponse, APISchemas, QualityType } from "./api";
import { campToCampApiUrl } from "./url";
import { MountainGeoOption, epsg3857to4326 } from "~geo";
import { nanoid } from "nanoid";
import { Point } from "geojson";

export function fetchC2cGeodageAPI<Path extends APIPaths, Options extends APIRequests<Path>>(
  path: Path,
  options?: Options,
): Promise<APIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, campToCampApiUrl);
}

export async function c2cWaypointSearch(searchValue: string): Promise<MountainGeoOption[]> {
  const response = await fetchC2cGeodageAPI("/waypoints", {
    method: "get",
    query: {
      q: searchValue,
      pl: "fr",
      limit: 10,
      bbox: "-1272016,4944532,2034955,6803481",
    },
  });

  return response.documents.map((waypoint) => parseC2CWaypoint(waypoint)).filter(isNotNull);
}

function isNotNull(w: MountainGeoOption | null): w is MountainGeoOption {
  return w !== null;
}

function getLocaleValue(items: APISchemas["LocaleItem"][], fallback = "") {
  return items[0]?.title || fallback;
}

function getAreaContext(areas: APISchemas["Area"][], limit = 2) {
  // areas are sorted from general to more accurate
  const lastAreas = areas.slice(-limit).reverse();

  return lastAreas.reduce((context, area, idx) => {
    if (idx !== 0) {
      context += ", ";
    }
    return context + getLocaleValue(area.locales);
  }, "");
}

function getScoreFromQuality(quality: QualityType) {
  // we are not assign a zero score because we don't
  // want another request.
  switch (quality) {
    case "draft":
      return 0.2;
    case "medium":
      return 0.5;
    case "fine":
      return 0.75;
    case "great":
      return 1;
    case "empty":
    default:
      return 0.1;
  }
}

export function parseC2CWaypoint(collection: APISchemas["Waypoint"]): MountainGeoOption | null {
  const { document_id, geometry, locales, areas, quality, waypoint_type } = collection;
  const uniqId = nanoid();

  const point3857 = JSON.parse(geometry.geom) as Point;
  if (point3857.type !== "Point") {
    return null;
  }

  return {
    id: uniqId,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: epsg3857to4326(point3857.coordinates),
    },
    properties: {
      id: `c2c-waypoint-${document_id}`,
      name: getLocaleValue(locales),
      context: getAreaContext(areas, 2),
      label: getLocaleValue(locales),
      score: getScoreFromQuality(quality),
      type: waypoint_type,
      originalProperties: collection,
    },
  };
}
