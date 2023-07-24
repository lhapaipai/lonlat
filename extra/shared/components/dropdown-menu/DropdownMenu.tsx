import { ReactNode } from "react";
import { DropdownMenuOptions } from "./interface";
import { DropdownMenuContext, useDropdownMenu } from ".";

import "../dialog/Dialog.scss";
import "./DropdownMenu.scss";

interface Props extends DropdownMenuOptions {
  children: ReactNode;
}

export default function DropdownMenu({ children, ...options }: Props) {
  const popover = useDropdownMenu(options);
  return <DropdownMenuContext.Provider value={popover}>{children}</DropdownMenuContext.Provider>;
}
