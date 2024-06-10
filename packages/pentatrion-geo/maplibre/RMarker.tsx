import { Marker as MarkerOriginal } from "maplibre-gl";
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  prepareEventDep,
  transformPropsToOptions,
  updateClassNames,
  useMap,
  Event,
} from "maplibre-react-components";
import { Marker, MarkerOptions } from "./Marker";

const eventNameToCallbackName = {
  dragstart: "onDragStart",
  drag: "onDrag",
  dragend: "onDragEnd",
  click: "onClick",
} as const;
export type MarkerEventName = keyof typeof eventNameToCallbackName;

type MarkerEvent = Event<MarkerOriginal> | MouseEvent;

export type MarkerCallbacks = {
  onDragStart?: (e: Event<Marker>) => void;
  onDrag?: (e: Event<Marker>) => void;
  onDragEnd?: (e: Event<Marker>) => void;

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
export type MarkerReactiveOptionName = (typeof markerReactiveOptionNames)[number];
export type MarkerReactiveOptions = {
  [key in MarkerReactiveOptionName]?: MarkerOptions[key];
};

export const markerNonReactiveOptionNames = [] as const;
export type MarkerNonReactiveOptionName = (typeof markerNonReactiveOptionNames)[number];
export type MarkerInitialOptionName = `initial${Capitalize<MarkerNonReactiveOptionName>}`;
export type MarkerInitialOptions = {
  [key in MarkerNonReactiveOptionName as `initial${Capitalize<key>}`]?: MarkerOptions[key];
};

export type MarkerProps = MarkerInitialOptions & MarkerReactiveOptions & MarkerCallbacks;

type RMarkerProps = MarkerProps & {
  longitude: number;
  latitude: number;
};

export const RMarker = memo(
  forwardRef<Marker, RMarkerProps>(function RMarker(props, ref) {
    const { longitude, latitude, ...markerProps } = props;
    const map = useMap();

    const [options, markerCallbacks] = transformPropsToOptions(markerProps) as [
      Omit<MarkerOptions, "element" | "bottom" | "offset">,
      MarkerCallbacks,
    ];

    const prevOptionsRef = useRef<Omit<MarkerOptions, "element">>(options);

    const currCallbacksRef = useRef<MarkerCallbacks>();
    currCallbacksRef.current = markerCallbacks;

    const marker = useMemo(() => {
      const mk = new Marker({
        ...options,
        anchor: "bottom",
      });
      mk.setLngLat([longitude, latitude]);

      return mk;
      // marker reactivity is managed below
      // we don't want to destroy/re-instanciate a Marker instance in each render
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eventDepStr = prepareEventDep(eventNameToCallbackName, markerCallbacks).join("-");
    useEffect(() => {
      function onMarkerEvent(e: MarkerEvent) {
        const eventType = e.type as MarkerEventName;
        const callbackName = eventNameToCallbackName[eventType];
        if (currCallbacksRef.current?.[callbackName]) {
          // @ts-ignore
          // the type of event depends on its nature and
          // event subscribers expect specific and not generic events
          currCallbacksRef.current[callbackName]?.(e);
        } else {
          console.info("not managed RMarker event", eventType, e);
        }
      }

      const eventNames = eventDepStr.split("-") as MarkerEventName[];

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
  }),
);
