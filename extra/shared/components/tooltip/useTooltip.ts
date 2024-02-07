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

const arrowWidth = 16;

export default function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpen: setControlledOpen,
  openDelay = 100,
  closeDelay = 500,
  color = "default",
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const isUncontrolled = controlledOpen === null || controlledOpen === undefined;

  const open = isUncontrolled ? uncontrolledOpen : controlledOpen;
  const setOpen = isUncontrolled ? setUncontrolledOpen : setControlledOpen;

  const arrowRef = useRef<HTMLDivElement>(null);

  const offsetVal = arrowWidth / 2;

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
    /**
     * we already use transform with transition status
     * see : components/dialog/Dialog.scss (data-status)
     */
    transform: false,
  });
  const { context } = data;

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

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef,
      color,
    }),
    [open, setOpen, color, interactions, data],
  );
}
