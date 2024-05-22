import { Placement } from "@floating-ui/react";
import { ThemeColor } from "~/types.d";

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  color?: ThemeColor;
  modal?: boolean;
}

export { ThemeColor };
