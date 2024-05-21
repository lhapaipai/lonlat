import { type ThemeColor } from "../../types";

export interface ModalOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  color?: ThemeColor | "default";
}

export { ThemeColor };
