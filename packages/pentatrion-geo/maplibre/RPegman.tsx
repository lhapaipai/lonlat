import { MarkerOptions } from "maplibre-gl";
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  useMap,
  Event,
  prepareEventDep,
  transformPropsToOptions,
  updateClassNames,
} from "maplibre-react-components";
import { Pegman } from "./Pegman";

const eventNameToCallbackName = {
  dragstart: "onDragStart",
  drag: "onDrag",
  dragend: "onDragEnd",
  click: "onClick",
} as const;
export type MarkerEventName = keyof typeof eventNameToCallbackName;

type PegmanEvent = Event<Pegman> | MouseEvent;

export type PegmanCallbacks = {
  onDragStart?: (e: Event<Pegman>) => void;
  onDrag?: (e: Event<Pegman>) => void;
  onDragEnd?: (e: Event<Pegman>) => void;

  // native DOM event
  onClick?: (e: MouseEvent) => void;
};

export const markerReactiveOptionNames = [
  "className",
  "offset",
  "draggable",
  "clickTolerance",
  "pitchAlignment",
  "opacity",
  "opacityWhenCovered",
] as const;
export type MarkerReactiveOptionName = (typeof markerReactiveOptionNames)[number];
export type MarkerReactiveOptions = {
  [key in MarkerReactiveOptionName]?: MarkerOptions[key];
};

export const markerNonReactiveOptionNames = ["anchor", "color", "scale"] as const;
export type MarkerNonReactiveOptionName = (typeof markerNonReactiveOptionNames)[number];
export type MarkerInitialOptionName = `initial${Capitalize<MarkerNonReactiveOptionName>}`;
export type MarkerInitialOptions = {
  [key in MarkerNonReactiveOptionName as `initial${Capitalize<key>}`]?: MarkerOptions[key];
};

export type PegmanOptions = Omit<
  MarkerOptions,
  "element" | "rotation" | "rotationAlignment" | "offset"
>;
export type PegmanProps = MarkerInitialOptions & MarkerReactiveOptions & PegmanCallbacks;

type RPegmanProps = PegmanProps & {
  longitude: number;
  latitude: number;
  bearing?: number;
};

export const RPegman = memo(
  forwardRef<Pegman, RPegmanProps>(function RPegman(props, ref) {
    const { longitude, latitude, bearing, ...pegmanProps } = props;
    const map = useMap();

    const [options, markerCallbacks] = transformPropsToOptions(pegmanProps) as [
      PegmanOptions,
      PegmanCallbacks,
    ];

    const prevOptionsRef = useRef<Omit<PegmanOptions, "element">>(options);

    const currCallbacksRef = useRef<PegmanCallbacks>();
    currCallbacksRef.current = markerCallbacks;

    const marker = useMemo(() => {
      const mk = new Pegman({
        ...options,
        element: undefined,
        bearing,
      });
      mk.setLngLat([longitude, latitude]);

      return mk;
      // marker reactivity is managed below
      // we don't want to destroy/re-instanciate a Pegman instance in each render
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eventDepStr = prepareEventDep(eventNameToCallbackName, markerCallbacks).join("-");
    useEffect(() => {
      function onMarkerEvent(e: PegmanEvent) {
        const eventType = e.type as MarkerEventName;
        const callbackName = eventNameToCallbackName[eventType];
        if (currCallbacksRef.current?.[callbackName]) {
          // @ts-ignore
          // the type of event depends on its nature and
          // event subscribers expect specific and not generic events
          currCallbacksRef.current[callbackName]?.(e);
        } else {
          console.info("not managed RPegman event", eventType, e);
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
      className,
      draggable,
      clickTolerance = 0,
      pitchAlignment,
      opacity,
      opacityWhenCovered,
    } = options;

    useImperativeHandle(ref, () => marker as Pegman, [marker]);

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
    if (bearing !== undefined && marker.getBearing() !== bearing) {
      marker.setBearing(bearing);
    }
    if (marker.isDraggable() !== draggable) {
      marker.setDraggable(draggable);
    }
    if (marker._clickTolerance !== clickTolerance) {
      marker._clickTolerance = clickTolerance;
    }
    if (marker.getPitchAlignment() !== pitchAlignment) {
      marker.setPitchAlignment(pitchAlignment);
    }
    if (marker._opacity !== opacity || marker._opacityWhenCovered !== opacityWhenCovered) {
      marker.setOpacity(opacity, opacityWhenCovered);
    }

    prevOptionsRef.current = options;

    return null;
  }),
);
