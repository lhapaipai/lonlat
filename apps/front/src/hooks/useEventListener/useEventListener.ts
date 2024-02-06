import { RefObject, useEffect, useRef } from "react";

export function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element?: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions,
): void;
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void;
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void;
export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList = HTMLElement,
>(
  eventName: KW | KH | KM,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | MediaQueryListEventMap[KM] | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const currentElement = element?.current ?? window;
    if (!currentElement || !currentElement.addEventListener) {
      return;
    }

    const listener: typeof handler = (event) => {
      savedHandler.current(event);
    };

    currentElement.addEventListener(eventName, listener, options);

    return () => {
      // console.log("event listener destroyed");
      currentElement.removeEventListener(eventName, listener, options);
    };
  }, [element, eventName, options]);
}
