import { createContext, useContext } from "react";
import usePopover from "./usePopover";

/* TODO  FROM codesandbox.io
https://codesandbox.io/s/distracted-swirles-jo1pvu?file=/src/Popover.tsx:1793-2041
type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;
  */

type ContextType = ReturnType<typeof usePopover> | null;

export const PopoverContext = createContext<ContextType>(null);

export default function usePopoverContext() {
  const context = useContext(PopoverContext);
  // TODO Fix !! ===
  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
}
