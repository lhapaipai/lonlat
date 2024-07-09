import { SearchState } from "~/features/search/searchSlice";
import { MapState } from "~/features/map/mapSlice";
import { HashData } from "./hash.d";
import { parseSearch, stringifySearch } from "./search";
import { stringifyMap, parseMapHash } from "./map";
import { DirectionState } from "~/features/direction/directionSlice";
import { parseDirection, stringifyDirection } from "./direction";
import { parseConfig, stringifyConfig } from "./config";
import { ConfigState } from "~/store/configSlice";

type Mode = "v"; /* verbose */

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
