import { SearchState } from "~/features/search/searchSlice";
import { parseGeoPoint, stringifyGeoPoint } from "~/lib/hashUtil";

export function stringifySearch(
  search: SearchState,
  compact = true,
): string | null {
  if (!search.feature) {
    return null;
  }

  return stringifyGeoPoint(search.feature, compact);
}

export function parseSearch(search: string | null): SearchState | null {
  if (!search) {
    return null;
  }

  const feature = parseGeoPoint(search);

  return feature
    ? {
        feature: feature,
      }
    : null;
}
