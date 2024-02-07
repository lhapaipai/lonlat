import { Placement } from "@floating-ui/react";
import { ThemeColor } from "../../types";

export interface DropdownMenuOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  color?: ThemeColor | "default";
  modal?: boolean;
}
