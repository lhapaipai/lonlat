import { Placement } from "@floating-ui/react";
import { ThemeColor } from "../..";

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  color?: ThemeColor;
  contentClassName?: string;
}
