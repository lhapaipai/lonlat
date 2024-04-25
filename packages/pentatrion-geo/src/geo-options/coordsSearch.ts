/* eslint-disable no-empty */
import { LngLat } from "maplibre-gl";
import { LonLatGeoOption } from "~geo";
import { createLonLatFeaturePoint } from "./lonlat";
import { ddmToDd, dmsToDd } from "./util";

const dms = /(\d+)\s*°\s*(\d+)\s*['′]\s*(\d+(?:\.\d+)?)\s*["″]/;
const ddm = /(\d+)\s*°\s*(\d+(?:\.\d+)?)\s*['′]/;
const dd = /(-?\d+(?:\.\d+)?)/;
const delimiter = /(?:\s*[,;]\s*|\s+)/;

const begin = /^\s*/;
const end = /\s*$/;

const longitudePrefix = /(?:longitude|lng|lon)\s*:\s*/;
const latitudePrefix = /(?:latitude|lat)\s*:\s*/;

const longitudeSuffix = /\s*([NnSs])\s*/;
const latitudeSuffix = /\s*([WwEeOo])\s*/;

export const basicRegex = new RegExp(
  begin.source + dd.source + delimiter.source + dd.source + end.source,
);

export const lonlatDmsRegex = new RegExp(
  begin.source +
    dms.source +
    longitudeSuffix.source +
    delimiter.source +
    dms.source +
    latitudeSuffix.source +
    end.source,
);

export const latlonDmsRegex = new RegExp(
  begin.source +
    dms.source +
    latitudeSuffix.source +
    delimiter.source +
    dms.source +
    longitudeSuffix.source +
    end.source,
);

export const lonlatDdmRegex = new RegExp(
  begin.source +
    ddm.source +
    longitudeSuffix.source +
    delimiter.source +
    ddm.source +
    latitudeSuffix.source +
    end.source,
);

export const latlonDdmRegex = new RegExp(
  begin.source +
    ddm.source +
    latitudeSuffix.source +
    delimiter.source +
    ddm.source +
    longitudeSuffix.source +
    end.source,
);

export const lonlatRegex = new RegExp(
  begin.source +
    longitudePrefix.source +
    dd.source +
    delimiter.source +
    latitudePrefix.source +
    dd.source +
    end.source,
);

export const latlonRegex = new RegExp(
  begin.source +
    latitudePrefix.source +
    dd.source +
    delimiter.source +
    longitudePrefix.source +
    dd.source +
    end.source,
);

function createFeatures(strLon: string | number, strLat: string | number, strict = true) {
  const lon = Number(strLon);
  const lat = Number(strLat);
  const results: LonLatGeoOption[] = [];
  try {
    const lngLat = LngLat.convert([lon, lat]);
    results.push(createLonLatFeaturePoint(lngLat));
  } catch (_) {}

  if (!strict) {
    try {
      const lngLat = LngLat.convert([lat, lon]);
      results.push(createLonLatFeaturePoint(lngLat));
    } catch (_) {}
  }

  return results;
}

export function coordsSearch(searchValue: string): LonLatGeoOption[] {
  if (searchValue.length < 3) {
    return [];
  }
  let match: RegExpExecArray | null;

  match = basicRegex.exec(searchValue);
  if (match) {
    return createFeatures(match[1], match[2], false);
  }

  match = lonlatRegex.exec(searchValue);
  if (match) {
    return createFeatures(match[1], match[2]);
  }

  match = latlonRegex.exec(searchValue);
  if (match) {
    return createFeatures(match[2], match[1]);
  }

  match = lonlatDmsRegex.exec(searchValue);
  if (match) {
    return createFeatures(
      dmsToDd(match[5], match[6], match[7], match[8]),
      dmsToDd(match[1], match[2], match[3], match[4]),
    );
  }

  match = latlonDmsRegex.exec(searchValue);
  if (match) {
    return createFeatures(
      dmsToDd(match[1], match[2], match[3], match[4]),
      dmsToDd(match[5], match[6], match[7], match[8]),
    );
  }

  match = lonlatDdmRegex.exec(searchValue);
  if (match) {
    return createFeatures(
      ddmToDd(match[4], match[5], match[6]),
      ddmToDd(match[1], match[2], match[3]),
    );
  }

  match = latlonDdmRegex.exec(searchValue);
  if (match) {
    return createFeatures(
      ddmToDd(match[1], match[2], match[3]),
      ddmToDd(match[4], match[5], match[6]),
    );
  }

  return [];
}
