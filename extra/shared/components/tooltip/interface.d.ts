import { Placement } from "@floating-ui/react";
import { ThemeColor } from "@lonlat/shared/types";

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  color?: ThemeColor | "default";
}
