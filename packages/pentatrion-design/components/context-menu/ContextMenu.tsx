import {
  Children,
  ComponentPropsWithRef,
  ReactElement,
  RefObject,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";

import { ContextMenuItemProps } from "./ContextMenuItem";
import { Dialog } from "../dialog";
import { useEventCallback, useRefDebounce } from "../../hooks";

type CustomContextEvent = CustomEvent<{ emulated: boolean; originalEvent: Event }>;

interface Props extends ComponentPropsWithRef<"div"> {
  target?: RefObject<HTMLElement | unknown>;
  children: ReactElement[] | ReactElement;
  eventName?: "contextmenu" | string;
  debounceOpenning?: number;
}
export function ContextMenu({ target, children, style, eventName = "contextmenu" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isOpenDebounceRef = useRefDebounce(isOpen, 200);
  const contextEvent = useRef<MouseEvent | CustomEvent | null>(null);
  const listItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const listContentRef = useRef(
    Children.map(children, (child) =>
      isValidElement<ContextMenuItemProps>(child) ? child.props.label : null,
    ) as (string | null)[],
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip(),
      size({
        apply({ elements, availableHeight }) {
          const firstChild = elements.floating.firstElementChild as HTMLElement;
          if (firstChild) {
            firstChild.style.maxHeight = `${Math.min(availableHeight, 300)}px`;
          }
        },
        padding: 10,
      }),
      shift({ padding: 10 }),
    ],
    /**
     * it is better to be less demanding on small screen sizes to see the content displayed correctly
     */
    placement: window.matchMedia("(min-width: 700px)").matches ? "right-start" : undefined,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context);

  const listNavigation = useListNavigation(context, {
    listRef: listItemsRef,
    onNavigate: setActiveIndex,
    activeIndex,
  });
  const typeahead = useTypeahead(context, {
    enabled: isOpen,
    listRef: listContentRef,
    onMatch: setActiveIndex,
    activeIndex,
  });

  const { getFloatingProps, getItemProps } = useInteractions([
    role,
    dismiss,
    listNavigation,
    typeahead,
  ]);

  const onContextMenuStable = useEventCallback(function onContextMenu(
    e: MouseEvent | CustomContextEvent,
  ) {
    e.preventDefault();
    /**
     * in certain cases (maplibre-gl) we will not be able to use the
     * native "contextmenu" event for touch screens and we will emulate this
     * with a simple "click" event
     *
     * with emulated event if the context menu has just been closed we probably
     * do not want a click to immediately reopen a new context menu
     */
    const isEmulatedContextMenu =
      e.type !== "contextmenu" && (e as CustomContextEvent).detail.emulated;

    if (isEmulatedContextMenu && isOpenDebounceRef.current) {
      return;
    }

    const originalEvent = e instanceof MouseEvent ? e : (e.detail.originalEvent as MouseEvent);
    contextEvent.current = e;

    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: originalEvent.clientX,
          y: originalEvent.clientY,
          top: originalEvent.clientY,
          right: originalEvent.clientX,
          bottom: originalEvent.clientY,
          left: originalEvent.clientX,
        };
      },
    });

    setIsOpen(true);
    isOpenDebounceRef.current = true;
  });

  useEffect(() => {
    let stableTarget = document.documentElement;
    if (target) {
      stableTarget =
        target.current instanceof HTMLElement
          ? target.current
          : // usage when target is RefObject<Map> with Map from "maplibre-gl"
            (
              target.current as {
                getCanvasContainer: () => HTMLElement;
              }
            ).getCanvasContainer();
    }
    console.log("add contextmenu", target);
    stableTarget.addEventListener(eventName as "contextmenu", onContextMenuStable);
    return () => {
      console.log("remove contextmenu", target);
      stableTarget.removeEventListener(eventName as "contextmenu", onContextMenuStable);
    };
  }, [eventName, onContextMenuStable, target]);

  return (
    <FloatingPortal>
      {isOpen && (
        <FloatingFocusManager context={context} initialFocus={refs.floating}>
          <div
            className="z-dialog outline-none"
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...style }}
            {...getFloatingProps()}
          >
            <Dialog
              placement={context.placement}
              className="animate-fade-in-list z-context-menu max-h-80 overflow-auto"
            >
              {Children.map(
                children,
                (child, index) =>
                  isValidElement<ContextMenuItemProps>(child) &&
                  cloneElement(
                    child,
                    getItemProps({
                      tabIndex: activeIndex === index ? 0 : -1,
                      ref(node: HTMLButtonElement) {
                        listItemsRef.current[index] = node;
                      },
                      onMouseUp() {
                        child.props.onClick?.(contextEvent.current);
                        setIsOpen(false);
                      },
                    }),
                  ),
              )}
            </Dialog>
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
}
