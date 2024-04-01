import { Marker, MarkerOptions } from "maplibre-gl";
import {
  ReactNode,
  Ref,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { Event } from "../types/env";
import useMap from "../hooks/useMap";
import {
  arePointsEqual,
  prepareEventDep,
  transformPropsToOptions,
  updateClassNames,
} from "../lib/util";
import { LLMarker } from "maplibre-components";
import { LLMarkerOptions } from "maplibre-components/src/LLMarker";

const eventNameToCallback = {
  dragstart: "onDragStart",
  drag: "onDrag",
  dragend: "onDragEnd",
} as const;
export type MarkerEventName = keyof typeof eventNameToCallback;

type MarkerEvent = Event<Marker>;

export type MarkerCallbacks = {
  onDragStart?: (e: Event<Marker>) => void;
  onDrag?: (e: Event<Marker>) => void;
  onDragEnd?: (e: Event<Marker>) => void;
};

export const markerReactiveOptionNames = [
  "className",
  "offset",
  "draggable",
  "clickTolerance",
  "rotation",
  "rotationAlignment",
  "pitchAlignment",
  "opacity",
  "opacityWhenCovered",
  "color",
  "scale",
] as const;
export type MarkerReactiveOptionName = (typeof markerReactiveOptionNames)[number];
export type MarkerReactiveOptions = {
  [key in MarkerReactiveOptionName]?: MarkerOptions[key];
};

export const markerNonReactiveOptionNames = ["anchor"] as const;
export type MarkerNonReactiveOptionName = (typeof markerNonReactiveOptionNames)[number];
export type MarkerInitialOptionName = `initial${Capitalize<MarkerNonReactiveOptionName>}`;
export type MarkerInitialOptions = {
  [key in MarkerNonReactiveOptionName as `initial${Capitalize<key>}`]?: MarkerOptions[key];
};

export type MarkerProps = MarkerInitialOptions & MarkerReactiveOptions & MarkerCallbacks;

// il faudra couvrir l'option element

type RMarkerProps = MarkerProps & {
  longitude: number;
  latitude: number;
  markerClass?: {
    new (options?: LLMarkerOptions): Marker;
  };

  // popup?: Popup;

  children?: ReactNode;
};

function RMarker(props: RMarkerProps, ref: Ref<Marker>) {
  const { longitude, latitude, markerClass = Marker, children, ...markerProps } = props;
  const map = useMap();

  const [options, callbacks] = transformPropsToOptions(markerProps) as [
    Omit<MarkerOptions, "element">,
    MarkerCallbacks,
  ];

  const prevOptionsRef = useRef<Omit<MarkerOptions, "element">>(options);

  const currCallbacksRef = useRef<MarkerCallbacks>();
  currCallbacksRef.current = callbacks;

  const marker = useMemo(() => {
    const completeOptions = {
      ...options,
      element: undefined,
    };

    const mk = new markerClass(completeOptions);
    mk.setLngLat([longitude, latitude]);

    return mk;
  }, []);

  const eventDepStr = prepareEventDep(eventNameToCallback, callbacks).join("-");
  useEffect(() => {
    function onMarkerEvent(e: MarkerEvent) {
      const eventType = e.type as MarkerEventName;
      const callbackName = eventNameToCallback[eventType];
      if (currCallbacksRef.current?.[callbackName]) {
        currCallbacksRef.current[callbackName]?.(e);
      } else {
        console.info("not managed RMarker event", eventType, e);
      }
    }

    const eventNames = eventDepStr.split("-") as MarkerEventName[];

    eventNames.forEach((eventName) => {
      marker.on(eventName, onMarkerEvent);
    });

    return () => {
      eventNames.forEach((eventName) => {
        marker.off(eventName, onMarkerEvent);
      });
    };
  }, [eventDepStr, marker]);

  useEffect(() => {
    marker.addTo(map);

    return () => void marker.remove();
  }, []);

  const {
    color,
    scale,
    className,
    offset,
    draggable,
    clickTolerance = 0,
    rotation,
    rotationAlignment,
    pitchAlignment,
    opacity,
    opacityWhenCovered,
  } = options;

  useImperativeHandle(ref, () => marker as Marker, [marker]);

  if (prevOptionsRef.current.className !== className) {
    updateClassNames(
      marker._element,
      prevOptionsRef.current.className?.split(" ") || [],
      className?.split(" ") || [],
    );
  }
  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
    marker.setLngLat([longitude, latitude]);
  }
  if (offset && !arePointsEqual(marker.getOffset(), offset)) {
    marker.setOffset(offset);
  }
  if (marker.isDraggable() !== draggable) {
    marker.setDraggable(draggable);
  }
  if (marker._clickTolerance !== clickTolerance) {
    marker._clickTolerance = clickTolerance;
  }
  if (marker.getRotation() !== rotation) {
    marker.setRotation(rotation);
  }
  if (marker.getRotationAlignment() !== rotationAlignment) {
    marker.setRotationAlignment(rotationAlignment);
  }
  if (marker.getPitchAlignment() !== pitchAlignment) {
    marker.setPitchAlignment(pitchAlignment);
  }
  if (marker._opacity !== opacity || marker._opacityWhenCovered !== opacityWhenCovered) {
    marker.setOpacity(opacity, opacityWhenCovered);
  }
  if (marker._color !== color && marker instanceof LLMarker) {
    marker.setColor(color);
  }
  if (marker._scale !== scale && marker instanceof LLMarker) {
    marker.setScale(scale);
  }

  // if (marker.getPopup() !== popup) {
  //   marker.setPopup(popup);
  // }

  prevOptionsRef.current = options;

  return createPortal(children, marker.getElement());
}

export default memo(forwardRef(RMarker));
