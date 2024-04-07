import { ThemeColor } from "../..";

export interface NotificationProps {
  id: number;
  message: string;
  expiration?: number; // in ms. if -1 never expire
  color?: ThemeColor;
  canClose?: boolean;
  withLoader?: boolean;
  onRemove?: () => void;
}
export type NotificationOptions = Omit<Partial<NotificationProps>, "message">;
