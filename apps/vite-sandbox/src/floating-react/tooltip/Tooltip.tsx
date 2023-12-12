import { PropsWithChildren } from "react";
import { TooltipOptions } from "./types";
import useTooltip from "./useTooltip";
import { TooltipContext } from "./useTooltipContext";

interface TooltipProps extends PropsWithChildren, TooltipOptions {}

export default function Tooltip({ children, ...options }: TooltipProps) {
  const tooltip = useTooltip(options);
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
