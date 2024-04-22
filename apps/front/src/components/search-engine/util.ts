import { SearchEngine } from "~/store/mapSlice";

export function iconBySearchEngine(searchEngine: SearchEngine) {
  switch (searchEngine) {
    case "ign-address":
      return "fe-locality";
    case "c2c":
      return "fe-summit";
    case "nominatim":
      return "fe-globe";
  }
}
