import { LineLayerSpecification } from "maplibre-gl";

type OptionalSource<T> = Omit<T, "source"> & { source?: string };

export const routeLayer: OptionalSource<LineLayerSpecification> = {
  id: "direction-route",
  type: "line",
  paint: {
    "line-color": "#333",
    "line-width": 3,
  },
};
