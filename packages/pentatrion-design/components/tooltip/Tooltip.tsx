import { ReactNode } from "react";
import { TooltipOptions } from "./interface";
import { useTooltip, TooltipContext } from ".";

interface Props extends TooltipOptions {
  children: ReactNode;
}

export function Tooltip({ children, ...options }: Props) {
  const tooltip = useTooltip(options);
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
