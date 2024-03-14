import { ThemeColor } from "@lonlat/shared/types";

export interface ModalOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  color?: ThemeColor | "default";
}
