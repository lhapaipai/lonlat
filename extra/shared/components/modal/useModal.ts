import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ModalOptions } from "./interface";
import { useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";

export default function useModal({
  initialOpen = false,
  open: controlledOpen,
  onOpen: setControlledOpen,
  type = "default",
}: ModalOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const isUncontrolled = controlledOpen === null || controlledOpen === undefined;
  const open = isUncontrolled ? uncontrolledOpen : controlledOpen;
  const setOpen = isUncontrolled
    ? setUncontrolledOpen
    : (setControlledOpen as Dispatch<SetStateAction<boolean>>);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const { context } = data;

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      type,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, type, labelId, descriptionId],
  );
}
