import { ReactNode, isValidElement } from "react";
import { TooltipOptions } from "./interface";
import { Tooltip, TooltipContent, TooltipTrigger } from ".";

interface Props extends TooltipOptions {
  children: ReactNode;
  content: ReactNode;
}

export default function SimpleTooltip({ content, children, ...options }: Props) {
  return (
    <Tooltip {...options}>
      <TooltipContent>{content}</TooltipContent>
      <TooltipTrigger asChild={isValidElement(children)}>{children}</TooltipTrigger>
    </Tooltip>
  );
}
