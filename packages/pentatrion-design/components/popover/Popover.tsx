import { ReactNode } from "react";
import { PopoverOptions } from "./interface";
import { PopoverContext, usePopover } from ".";

interface Props extends PopoverOptions {
  children: ReactNode;
}

export function Popover({ children, ...options }: Props) {
  const popover = usePopover(options);
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
}
