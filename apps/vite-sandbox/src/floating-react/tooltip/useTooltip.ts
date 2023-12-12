import { useMemo, useRef, useState } from "react";
import { TooltipOptions } from "./types";
import {
  arrow,
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";

const arrowWidth = 12;

export default function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpen: setControlledOpen,
  openDelay = 500,
  closeDelay = 500,
  type = "default",
}: TooltipOptions) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const isUncontrolled = controlledOpen === null || controlledOpen === undefined;

  const open = isUncontrolled ? uncontrolledOpen : controlledOpen;
  const setOpen = isUncontrolled ? setUncontrolledOpen : setControlledOpen;

  const arrowRef = useRef<HTMLDivElement>(null);

  const offsetVal = 2 + arrowWidth / 2;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetVal),
      flip(),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
        padding: 8,
      }),
      hide({
        padding: 20,
      }),
    ],
    transform: false,
  });

  const context = data.context;

  const transitionStatus = useTransitionStatus(context, {
    duration: 250,
  });

  const hover = useHover(context, {
    move: false,
    enabled: isUncontrolled,
    delay: {
      open: openDelay || 1,
      close: closeDelay,
    },
  });

  const focus = useFocus(context, {
    enabled: isUncontrolled,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  console.log("useTooltip");

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      transitionStatus,
      arrowRef,
      type,
    }),
    [open, setOpen, type, interactions, data, transitionStatus],
  );
}
