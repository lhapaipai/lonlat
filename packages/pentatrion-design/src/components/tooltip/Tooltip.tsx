import { ReactNode } from "react";
import { TooltipOptions } from "./interface";
import useTooltip from "./useTooltip";
import { TooltipContext } from "./useTooltipContext";

interface Props extends TooltipOptions {
  children: ReactNode;
}

export default function Tooltip({ children, ...options }: Props) {
  const tooltip = useTooltip(options);
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
