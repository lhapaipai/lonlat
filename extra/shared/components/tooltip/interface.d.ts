import { Placement } from "@floating-ui/react";
import { ColorType } from "@lonlat/shared/types";

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  type?: ColorType | "default";
}
