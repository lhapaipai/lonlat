import { Marker as MaplibreMarker, MarkerOptions } from "maplibre-gl";
import {
  CSSProperties,
  Children,
  ReactNode,
  Ref,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { MapContext, MapContextValue } from "react-map-gl/dist/esm/components/map";
import { applyReactStyle } from "./apply-react-style";

type MarkerProps = MarkerOptions & {
  longitude: number;
  latitude: number;

  style?: CSSProperties;
  children?: ReactNode;
};

function Marker(props: MarkerProps, ref: Ref<MaplibreMarker>) {
  const { map, mapLib } = useContext(MapContext);
  const thisRef = useRef({ props });

  const marker: MaplibreMarker = useMemo(() => {
    let hasChildren = false;
    Children.forEach(props.children, (el) => {
      if (el) {
        hasChildren = true;
      }
    });
    const options = {
      ...props,
      element: hasChildren ? document.createElement("div") : undefined,
    };

    const mk = new MaplibreMarker(options);
    mk.setLngLat([props.longitude, props.latitude]);

    return mk;
  }, []);

  useEffect(() => {
    marker.addTo(map.getMap());

    return () => {
      marker.remove();
    };
  }, []);

  const {
    longitude,
    latitude,
    offset,
    style,
    draggable = false,
    popup = null,
    rotation = 0,
    rotationAlignment = "auto",
    pitchAlignment = "auto",
  } = props;

  useEffect(() => {
    applyReactStyle(marker.getElement(), style);
  }, [style]);

  useImperativeHandle(ref, () => marker, [marker]);

  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
    marker.setLngLat([longitude, latitude]);
  }

  return createPortal(props.children, marker.getElement());
}

export default memo(forwardRef(Marker));
