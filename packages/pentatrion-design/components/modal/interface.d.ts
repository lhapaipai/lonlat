import { ThemeColor } from "../..";

export interface ModalOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  color?: ThemeColor | "default";
}
