import { Marker } from "maplibre-gl";
import { Ref, forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  prepareEventDep,
  transformPropsToOptions,
  updateClassNames,
  useMap,
  Event,
} from "maplibre-react-components";
import { LLMarker } from "..";
import { LLMarkerOptions } from "../LLMarker";

const eventNameToCallback = {
  dragstart: "onDragStart",
  drag: "onDrag",
  dragend: "onDragEnd",
  click: "onClick",
} as const;
export type LLMarkerEventName = keyof typeof eventNameToCallback;

type LLMarkerEvent = Event<Marker> | MouseEvent;

export type LLMarkerCallbacks = {
  onDragStart?: (e: Event<LLMarker>) => void;
  onDrag?: (e: Event<LLMarker>) => void;
  onDragEnd?: (e: Event<LLMarker>) => void;

  // native DOM event
  onClick?: (e: MouseEvent) => void;
};

export const markerReactiveOptionNames = [
  "className",
  "draggable",
  "clickTolerance",
  "rotation",
  "rotationAlignment",
  "pitchAlignment",
  "opacity",
  "opacityWhenCovered",
  "color",
  "scale",
  "text",
  "icon",
] as const;
export type LLMarkerReactiveOptionName = (typeof markerReactiveOptionNames)[number];
export type LLMarkerReactiveOptions = {
  [key in LLMarkerReactiveOptionName]?: LLMarkerOptions[key];
};

export const markerNonReactiveOptionNames = [] as const;
export type LLMarkerNonReactiveOptionName = (typeof markerNonReactiveOptionNames)[number];
export type LLMarkerInitialOptionName = `initial${Capitalize<LLMarkerNonReactiveOptionName>}`;
export type LLMarkerInitialOptions = {
  [key in LLMarkerNonReactiveOptionName as `initial${Capitalize<key>}`]?: LLMarkerOptions[key];
};

export type LLMarkerProps = LLMarkerInitialOptions & LLMarkerReactiveOptions & LLMarkerCallbacks;

type RLLMarkerProps = LLMarkerProps & {
  longitude: number;
  latitude: number;
};

function RLLMarker(props: RLLMarkerProps, ref: Ref<Marker>) {
  const { longitude, latitude, ...markerProps } = props;
  const map = useMap();

  const [options, markerCallbacks] = transformPropsToOptions(markerProps) as [
    Omit<LLMarkerOptions, "element" | "bottom" | "offset">,
    LLMarkerCallbacks,
  ];

  const prevOptionsRef = useRef<Omit<LLMarkerOptions, "element">>(options);

  const currCallbacksRef = useRef<LLMarkerCallbacks>();
  currCallbacksRef.current = markerCallbacks;

  const marker = useMemo(() => {
    const mk = new LLMarker({
      ...options,
      anchor: "bottom",
    });
    mk.setLngLat([longitude, latitude]);

    return mk;
    // marker reactivity is managed below
    // we don't want to destroy/re-instanciate a Marker instance in each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventDepStr = prepareEventDep(eventNameToCallback, markerCallbacks).join("-");
  useEffect(() => {
    function onMarkerEvent(e: LLMarkerEvent) {
      const eventType = e.type as LLMarkerEventName;
      const callbackName = eventNameToCallback[eventType];
      if (currCallbacksRef.current?.[callbackName]) {
        // @ts-ignore
        // the type of event depends on its nature and
        // event subscribers expect specific and not generic events
        currCallbacksRef.current[callbackName]?.(e);
      } else {
        console.info("not managed RMarker event", eventType, e);
      }
    }

    const eventNames = eventDepStr.split("-") as LLMarkerEventName[];

    eventNames.forEach((eventName) => {
      if (eventName === "click") {
        marker.getElement().addEventListener("click", onMarkerEvent);
      } else {
        marker.on(eventName, onMarkerEvent);
      }
    });

    return () => {
      eventNames.forEach((eventName) => {
        if (eventName === "click") {
          marker.getElement().removeEventListener("click", onMarkerEvent);
        } else {
          marker.off(eventName, onMarkerEvent);
        }
      });
    };
  }, [eventDepStr, marker]);

  useEffect(() => {
    marker.addTo(map);

    return () => void marker.remove();
    // we can add [map, marker] but we know they will not change during the lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    scale,
    color,
    text,
    icon,
    className,
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
  if (marker.getColor() !== color) {
    marker.setColor(color);
  }
  if (marker.getScale() !== scale) {
    marker.setScale(scale);
  }
  if (marker.getText() !== text) {
    marker.setText(text);
  }
  if (marker.getIcon() !== icon) {
    marker.setIcon(icon);
  }

  prevOptionsRef.current = options;

  return null;
}

export default memo(forwardRef(RLLMarker));
