import { getDepartmentName } from "../feature-option/util";
import { IGNAddressProperties, IGNAddressResponse, IGNAddressReverseResponse } from "../types";

export async function ignReverseSearch([lng, lat]: [number, number]) {
  const collection = (await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ type: "FeatureCollection", features: [] });
    }, 500);
  })) as IGNAddressReverseResponse;

  // const collection = (await fetch(
  //   `https://data.geopf.fr/geocodage/reverse?lon=${lng}&lat=${lat}&limit=1`,
  // ).then((res) => res.json())) as IGNAddressResponse;
  return collection;
}

export async function ignSearch(searchValue: string, coords: [number, number]) {
  // const collection = (await fetch(`/data/ign-search.geojson`).then((res) =>
  //   res.json(),
  // )) as IGNAddressResponse;
  const collection = (await fetch(
    `https://data.geopf.fr/geocodage/search?q=${searchValue}&lon=${coords[0]}&lat=${coords[1]}`,
  ).then((res) => res.json())) as IGNAddressResponse;

  return collection;
}

export function getContext(properties: IGNAddressProperties) {
  switch (properties.type) {
    case "housenumber":
    case "street":
    case "locality":
      return `${properties.city}, ${getDepartmentName(properties.citycode)}`;
    case "municipality":
      return getDepartmentName(properties.citycode);
  }
  return properties.context || null;
}

export function getLabel(properties: IGNAddressProperties) {
  switch (properties.type) {
    case "housenumber":
    case "street":
      return `${properties.name}, ${properties.city}`;
    case "locality":
      if (properties.name !== properties.city) {
        return `${properties.name}, ${properties.city}`;
      }
      return `${properties.city}, ${getDepartmentName(properties.citycode)}`;
    case "municipality":
      return `${properties.name}, ${getDepartmentName(properties.citycode)}`;
  }
  return `${properties.name}, ${getDepartmentName(properties.citycode)}`;
}
