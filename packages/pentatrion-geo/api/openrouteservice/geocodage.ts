import { nanoid } from "nanoid";
import { AddressGeoOption, AddressType } from "../../types.d";
import { SearchProperties } from "./api";
import { fetchOpenRouteServiceAPI, openRouteServiceUrl } from "./config";
import { Feature, Point } from "geojson";

export async function orsSearch(
  searchValue: string,
  coords: [number, number],
  token?: string,
  serviceUrl = openRouteServiceUrl,
): Promise<AddressGeoOption[]> {
  if (searchValue.length < 3) {
    return [];
  }

  const collection = await fetchOpenRouteServiceAPI(
    "/geocode/search",
    {
      query: {
        text: searchValue,
        "focus.point.lon": coords[0],
        "focus.point.lat": coords[1],
      },
    },
    token,
    serviceUrl,
  );

  return collection.features.map(createOrsAddressFeaturePoint);
}

export function createOrsAddressFeaturePoint({
  type,
  geometry,
  properties,
}: Feature<Point, SearchProperties>): AddressGeoOption {
  const uniqId = nanoid();
  return {
    id: uniqId,
    type,
    geometry,
    properties: {
      id: properties.id || uniqId,

      name: properties.name,
      context: getContext(properties),

      label: getLabel(properties),
      score: properties.confidence,
      type: getType(properties),
      originalProperties: properties,
    },
  };
}

function getContext(properties: SearchProperties) {
  const context: string[] = [];
  switch (properties.layer) {
    case "address":
    case "venue":
    case "borough":
    case "neighbourhood":
    case "street":
    case "dependency":
    case "macrohood":
    case "microhood":
    case "postalcode": {
      // street -> Impasse des Perrières, Marignier, Haute-Savoie
      // neightbourhood -> Noailles, Marseille, Bouches-du-Rhône
      if (properties.locality) {
        context.push(properties.locality, properties.region);
      } else {
        context.push(properties.region);
      }

      break;
    }
    case "locality":
    case "localadmin":
    case "county":
    case "macrocounty": {
      if (properties.localadmin && properties.localadmin !== properties.locality) {
        // Ossat, Marignier, Haute-Savoie
        context.push(properties.localadmin, properties.region);
      }

      // Marignier, Haute-Savoie
      context.push(properties.region);

      break;
    }

    case "region":
    case "macroregion":
    case "country":
    case "continent": {
      break;
    }

    default:
      context.push(properties.region);
  }

  if (
    !["FR", "FRA"].includes(properties.country_a) &&
    !["country", "continent"].includes(properties.layer)
  ) {
    context.push(properties.country);
  }

  return context.join(", ");
}

function getLabel(properties: SearchProperties) {
  const context = getContext(properties);
  if (context) {
    return `${properties.name}, ${context}`;
  }
  return properties.name;
}

function getType(properties: SearchProperties): AddressType {
  switch (properties.layer) {
    case "address":
    case "street":
      return "street";
    case "venue":
    case "borough":
    case "neighbourhood":
    case "dependency":
    case "macrohood":
    case "microhood":
      return "locality";

    case "postalcode":
    case "locality":
    case "localadmin":
    case "county":
    case "macrocounty":
      return "municipality";

    case "region":
    case "macroregion":
    case "country":
    case "continent":
    default:
      return "unknown";
  }
}
