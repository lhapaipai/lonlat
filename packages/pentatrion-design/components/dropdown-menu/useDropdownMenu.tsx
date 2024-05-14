import { useCallback, useMemo, useRef, useState } from "react";
import type { DropdownMenuOptions } from "./interface.d.ts";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";

const arrowWidth = 12;

export default function useDropdownMenu({
  initialOpen = false,
  placement = "bottom",
  open: controlledOpen,
  onOpen: setControlledOpen,
  color = "default",
  modal = false,
}: DropdownMenuOptions) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const isUncontrolled = controlledOpen === null || controlledOpen === undefined;
  const open = isUncontrolled ? uncontrolledOpen : controlledOpen;
  const setOpen = isUncontrolled ? setUncontrolledOpen : setControlledOpen!;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

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
    ],
  });

  const { context } = data;

  const click = useClick(context, {
    // TODO verify if use case to disable it
    // enabled: isUncontrolled,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const handleSelect = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  function handleTypeaheadMatch(index: number | null) {
    if (open) {
      setActiveIndex(index);
    } else {
      handleSelect();
    }
  }

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: handleTypeaheadMatch,
  });

  const interactions = useInteractions([click, dismiss, role, listNav, typeahead]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      elementsRef,
      labelsRef,
      color,
      modal,
      activeIndex,
      handleSelect,
    }),
    [
      open,
      setOpen,
      interactions,
      data,
      color,
      modal,
      activeIndex,
      // getItemProps,
      handleSelect,
    ],
  );
}
