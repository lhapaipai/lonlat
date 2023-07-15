import { createContext, useContext } from "react";
import useTooltip from "./useTooltip";

type ContextType = ReturnType<typeof useTooltip> | null;

export const TooltipContext = createContext<ContextType>(null);

export default function useTooltipContext() {
  const context = useContext(TooltipContext);
  // TODO Fix !! ===

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
}
