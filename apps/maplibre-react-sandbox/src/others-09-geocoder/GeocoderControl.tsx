import { ReactElement, useState } from "react";
import { ControlPosition, Marker, MarkerProps, useControl } from "react-map-gl/maplibre";
// import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface GeocoderControlProps extends Omit<GeocoderOptions, "marker" | "accessToken"> {
  position: ControlPosition;
  marker?: boolean | Omit<MarkerProps, "longitude" | "latitude">;
  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
}
export default function GeocoderControl({
  position,
  marker: markerOptions = true,
  ...rest
}: GeocoderControlProps) {
  const [marker, setMarker] = useState<ReactElement | null>(null);

  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...rest,
        marker: false,
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
      });
      rest.onLoading && ctrl.on("loading", rest.onLoading);
      rest.onResults && ctrl.on("results", rest.onResults);
      ctrl.on("result", (evt) => {
        rest.onResult && rest.onResult(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center || (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && markerOptions) {
          const markerProps = typeof markerOptions === "object" ? markerOptions : {};
          setMarker(<Marker {...markerProps} longitude={location[0]} latitude={location[1]} />);
        } else {
          setMarker(null);
        }
      });
      rest.onError && ctrl.on("error", rest.onError);
      return ctrl;
    },
    {
      position,
    },
  );

  if (geocoder._map) {
    if (geocoder.getProximity() !== rest.proximity && rest.proximity !== undefined) {
      geocoder.setProximity(rest.proximity);
    }
    if (geocoder.getRenderFunction() !== rest.render && rest.render !== undefined) {
      geocoder.setRenderFunction(rest.render);
    }
    if (geocoder.getLanguage() !== rest.language && rest.language !== undefined) {
      geocoder.setLanguage(rest.language);
    }
    if (geocoder.getZoom() !== rest.zoom && rest.zoom !== undefined) {
      geocoder.setZoom(rest.zoom);
    }
    if (geocoder.getFlyTo() !== rest.flyTo && rest.flyTo !== undefined) {
      geocoder.setFlyTo(rest.flyTo);
    }
    if (geocoder.getPlaceholder() !== rest.placeholder && rest.placeholder !== undefined) {
      geocoder.setPlaceholder(rest.placeholder);
    }
    if (geocoder.getCountries() !== rest.countries && rest.countries !== undefined) {
      geocoder.setCountries(rest.countries);
    }
    if (geocoder.getTypes() !== rest.types && rest.types !== undefined) {
      geocoder.setTypes(rest.types);
    }
    if (geocoder.getMinLength() !== rest.minLength && rest.minLength !== undefined) {
      geocoder.setMinLength(rest.minLength);
    }
    if (geocoder.getLimit() !== rest.limit && rest.limit !== undefined) {
      geocoder.setLimit(rest.limit);
    }
    if (geocoder.getFilter() !== rest.filter && rest.filter !== undefined) {
      geocoder.setFilter(rest.filter);
    }
    if (geocoder.getOrigin() !== rest.origin && rest.origin !== undefined) {
      geocoder.setOrigin(rest.origin);
    }
  }

  return marker;
}
