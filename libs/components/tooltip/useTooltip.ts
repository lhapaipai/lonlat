import { useMemo, useRef, useState } from "react";
import { TooltipOptions } from "./interface";
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
} from "@floating-ui/react";

const arrowWidth = 12;

export default function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  openDelay = 0,
  closeDelay = 300,
  type = "default",
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const isNotControlled = controlledOpen === null || controlledOpen === undefined;

  const open = isNotControlled ? uncontrolledOpen : controlledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

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
  });
  const { context } = data;

  const hover = useHover(context, {
    move: false,
    enabled: isNotControlled,
    delay: {
      open: openDelay,
      close: closeDelay,
    },
  });
  const focus = useFocus(context, {
    enabled: isNotControlled,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      type,
      ...interactions,
      ...data,
    }),
    [open, setOpen, type, interactions, data],
  );
}
