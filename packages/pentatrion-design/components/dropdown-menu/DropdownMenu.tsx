import { ReactNode } from "react";
import { DropdownMenuOptions } from "./interface";
import { DropdownMenuContext, useDropdownMenu } from ".";

interface Props extends DropdownMenuOptions {
  children: ReactNode;
}

export function DropdownMenu({ children, ...options }: Props) {
  const popover = useDropdownMenu(options);
  return <DropdownMenuContext.Provider value={popover}>{children}</DropdownMenuContext.Provider>;
}
