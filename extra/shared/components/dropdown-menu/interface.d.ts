import { Placement } from "@floating-ui/react";
import { ColorType } from "../../types";

export interface DropdownMenuOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  type?: ColorType | "default";
  modal?: boolean;
}
