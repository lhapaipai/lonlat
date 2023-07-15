import { useMemo, useRef, useState } from "react";
import { PopoverOptions } from "./interface";
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";

const arrowWidth = 12;

export default function usePopover({
  initialOpen = false,
  placement = "bottom",
  open: controlledOpen,
  onOpen: setControlledOpen,
  type = "default",
  modal = false,
}: PopoverOptions) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

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
      flip({
        // crossAxis: placement.includes('-'),
        // fallbackAxisSideDirection: "end",
      }),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
        padding: 8,
      }),
    ],
    transform: false,
  });

  const { context } = data;

  const click = useClick(context, {
    enabled: isUncontrolled,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  const transitionStatus = useTransitionStatus(context, {
    duration: 250,
  });

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      transitionStatus,
      arrowRef,
      type,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, transitionStatus, type, modal, labelId, descriptionId],
  );
}
