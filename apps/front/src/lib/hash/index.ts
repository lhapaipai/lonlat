import { SearchState } from "~/features/search/searchSlice";
import { ViewState } from "~/store/mapSlice";
import { HashData } from "./hash.d";
import { parseSearch, stringifySearch } from "./search";
import { stringifyMap, parseMapHash } from "./map";
import { DirectionState } from "~/features/direction/directionSlice";
import { parseDirection, stringifyDirection } from "./direction";

type Mode = "v"; /* verbose */

export function getHashString(
  baseLayer: string,
  viewState: ViewState,
  searchState: SearchState,
  directionState: DirectionState,
) {
  const mapHash = stringifyMap(baseLayer, viewState);

  const mode: Mode = "v";

  const searchParams = new URLSearchParams();
  if (searchState.readOnly) {
    const searchStr = stringifySearch(searchState);
    searchStr && searchParams.set("search", searchStr);
  }

  // if (directionState.readOnly) {
  const directionStr = stringifyDirection(directionState);
  directionStr && searchParams.set("direction", directionStr);
  // }

  return searchParams.size === 0
    ? `#${mode}/${mapHash}`
    : `#${mode}/${mapHash}?${searchParams.toString()}`;
}

export function parseHashString(rawHash: string): HashData | null {
  const hash = rawHash.replace("#v/", "");
  if (hash === "") {
    return null;
  }
  const { pathname, searchParams } = new URL(hash, "http://prefix.local");

  const mapInfos = parseMapHash(pathname);
  if (!mapInfos) {
    return null;
  }

  return {
    ...mapInfos,
    search: parseSearch(searchParams.get("search")),
    direction: parseDirection(searchParams.get("direction")),
  };
}
