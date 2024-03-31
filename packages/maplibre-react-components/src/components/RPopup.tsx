import { Popup, PopupOptions } from "maplibre-gl";
import { Event } from "../types/env";
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
import { useMap } from "..";
import { deepEqual, prepareEventDep, transformPropsToOptions, updateClassNames } from "../lib/util";

const eventNameToCallback = {
  open: "onOpen",
  close: "onClose",
} as const;
export type PopupEventName = keyof typeof eventNameToCallback;

type PopupEvent = Event<Popup>;

export type PopupCallbacks = {
  onOpen?: (e: Event<Popup>) => void;
  onClose?: (e: Event<Popup>) => void;
};

export const popupReactiveOptionNames = ["className", "offset", "maxWidth"] as const;
export type PopupReactiveOptionName = (typeof popupReactiveOptionNames)[number];
export type PopupReactiveOptions = {
  [key in PopupReactiveOptionName]?: PopupOptions[key];
};

export const popupNonReactiveOptionNames = [
  "closeButton",
  "closeOnClick",
  "closeOnMove",
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

function RPopup(props: RPopupProps, ref: Ref<Popup>) {
  const { longitude, latitude, children, ...popupProps } = props;
  const map = useMap();
  console.log("render RPopup", map);
  const [options, callbacks] = transformPropsToOptions(popupProps) as [PopupProps, PopupCallbacks];

  const prevOptionsRef = useRef<PopupOptions>(options);

  const currCallbacksRef = useRef<PopupCallbacks>();
  currCallbacksRef.current = callbacks;

  const container = useMemo(() => {
    return document.createElement("div");
  }, []);

  const popup = useMemo(() => {
    const pp = new Popup(options);
    pp.setLngLat([longitude, latitude]);

    return pp;
  }, []);

  const eventDepStr = prepareEventDep(eventNameToCallback, callbacks).join("-");
  useEffect(() => {
    function onPopupEvent(e: PopupEvent) {
      const eventType = e.type as PopupEventName;
      const callbackName = eventNameToCallback[eventType];
      if (currCallbacksRef.current?.[callbackName]) {
        currCallbacksRef.current[callbackName]?.(e);
      } else {
        console.info("not managed RPopup event", eventType, e);
      }
    }

    const eventNames = eventDepStr.split("-") as PopupEventName[];

    eventNames.forEach((eventName) => {
      popup.on(eventName, onPopupEvent);
    });

    return () => {
      eventNames.forEach((eventName) => {
        popup.off(eventName, onPopupEvent);
      });
    };
  }, [eventDepStr, popup]);

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
}

export default memo(forwardRef(RPopup));
