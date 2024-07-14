import { SearchEngine } from "~/features/config/configSlice";

export function iconBySearchEngine(searchEngine: SearchEngine) {
  switch (searchEngine) {
    case "ign-address":
      return "fe-locality";
    case "c2c":
      return "fe-summit";
    case "ors":
      return "fe-globe";
    case "coords":
      return "fe-virtual";
  }
}
