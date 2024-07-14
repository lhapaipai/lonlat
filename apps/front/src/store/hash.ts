import { SearchState } from "~/features/search/searchSlice";
import { MapState } from "~/features/map/mapSlice";
import { DirectionState } from "~/features/direction/directionSlice";
import { ConfigState } from "~/features/config/configSlice";

import { parseSearch, stringifySearch } from "~/features/search/hash";
import { stringifyMap, parseMapHash } from "~/features/map/hash";
import { parseDirection, stringifyDirection } from "~/features/direction/hash";
import { parseConfig, stringifyConfig } from "~/features/config/hash";

type Mode = "v"; /* verbose */

export type HashData = {
  config: ConfigState | null;
  direction: DirectionState | null;
  map: MapState | null;
  search: SearchState | null;
};

export function getHashString(
  mapState: MapState,
  searchState: SearchState,
  directionState: DirectionState,
  configState: ConfigState,
) {
  const mapHash = stringifyMap(mapState);

  const mode: Mode = "v";

  const searchParams = new URLSearchParams();
  const searchStr = stringifySearch(searchState);
  searchStr && searchParams.set("search", searchStr);

  const directionStr = stringifyDirection(directionState);
  directionStr && searchParams.set("direction", directionStr);

  const configStr = stringifyConfig(configState);
  configStr && searchParams.set("config", configStr);

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

  return {
    map: parseMapHash(pathname),
    config: parseConfig(searchParams.get("config")),
    direction: parseDirection(searchParams.get("direction")),
    search: parseSearch(searchParams.get("search")),
  };
}
