import { MapLayerMouseEvent, MapLibreEvent, Popup, PopupOptions } from "maplibre-gl";
import {
  ReactNode,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useMap } from "../hooks/useMap";
import { deepEqual, prepareEventDep, transformPropsToOptions, updateClassNames } from "../lib/util";

const mapEventNameToCallback = {
  click: "onMapClick",
  move: "onMapMove",
} as const;
export type MapEventName = keyof typeof mapEventNameToCallback;

type MapEvent =
  | MapLayerMouseEvent
  | MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;

export type PopupCallbacks = {
  onMapClick?: (e: MapLayerMouseEvent) => void;
  onMapMove?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
};

export const popupReactiveOptionNames = ["className", "offset", "maxWidth"] as const;
export type PopupReactiveOptionName = (typeof popupReactiveOptionNames)[number];
export type PopupReactiveOptions = {
  [key in PopupReactiveOptionName]?: PopupOptions[key];
};

export const popupNonReactiveOptionNames = [
  "focusAfterOpen",
  "anchor",
  "subpixelPositioning",
] as const;
export type PopupNonReactiveOptionName = (typeof popupNonReactiveOptionNames)[number];
export type PopupInitialOptionName = `initial${Capitalize<PopupNonReactiveOptionName>}`;
export type PopupInitialOptions = {
  [key in PopupNonReactiveOptionName as `initial${Capitalize<key>}`]?: PopupOptions[key];
};

export type PopupProps = PopupInitialOptions & PopupReactiveOptions & PopupCallbacks;

// il faudra couvrir l'option element

type RPopupProps = PopupProps & {
  longitude: number;
  latitude: number;

  // popup?: Popup;

  children?: ReactNode;
};

export const RPopup = memo(
  forwardRef<Popup, RPopupProps>(function RPopup(props, ref) {
    const { longitude, latitude, children, ...popupProps } = props;
    const map = useMap();
    console.log("render RPopup", map);
    const [options, callbacks] = transformPropsToOptions(popupProps) as [
      PopupProps,
      PopupCallbacks,
    ];

    const prevOptionsRef = useRef<PopupOptions>(options);

    const currCallbacksRef = useRef<PopupCallbacks>();
    currCallbacksRef.current = callbacks;

    const container = useMemo(() => {
      return document.createElement("div");
    }, []);

    const popup = useMemo(() => {
      const pp = new Popup({
        ...options,
        closeButton: false,
        closeOnClick: false,
        closeOnMove: false,
      });
      pp.setLngLat([longitude, latitude]);

      return pp;
    }, []);

    const mapEventDepStr = prepareEventDep(mapEventNameToCallback, callbacks).join("-");
    useEffect(() => {
      function onMapEvent(e: MapEvent) {
        const eventType = e.type as MapEventName;
        const callbackName = mapEventNameToCallback[eventType];
        if (currCallbacksRef.current?.[callbackName]) {
          // @ts-ignore
          currCallbacksRef.current[callbackName]?.(e);
        } else {
          console.info("not managed RPopup map event", eventType, e);
        }
      }

      if (mapEventDepStr === "") {
        return;
      }

      const eventNames = mapEventDepStr.split("-") as MapEventName[];

      eventNames.forEach((eventName) => {
        map.on(eventName, onMapEvent);
      });

      return () => {
        eventNames.forEach((eventName) => {
          map.off(eventName, onMapEvent);
        });
      };
    }, [mapEventDepStr, map]);

    useEffect(() => {
      popup.setDOMContent(container).addTo(map);

      return () => void popup.remove();
    }, []);

    const { offset, maxWidth = "240px", className } = options;

    useImperativeHandle(ref, () => popup, [popup]);

    if (popup.isOpen()) {
      if (popup.getLngLat().lng !== longitude || popup.getLngLat().lat !== latitude) {
        popup.setLngLat([longitude, latitude]);
      }
      if (offset && !deepEqual(popup.options.offset, offset)) {
        popup.setOffset(offset);
      }
      if (prevOptionsRef.current.className !== className) {
        updateClassNames(
          container,
          prevOptionsRef.current.className?.split(" ") || [],
          className?.split(" ") || [],
        );
      }
      if (popup.getMaxWidth() !== maxWidth) {
        popup.setMaxWidth(maxWidth);
      }
    }

    prevOptionsRef.current = options;

    return createPortal(children, container);
  }),
);
