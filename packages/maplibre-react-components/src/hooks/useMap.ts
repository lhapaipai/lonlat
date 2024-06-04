import { useContext } from "react";
import { mapLibreContext } from "../context";

export default function useMap() {
  const context = useContext(mapLibreContext);

  if (context.mapManager === null) {
    throw new Error("use useMap in components inside <RMap />");
  }

  return context.mapManager.map;
}
