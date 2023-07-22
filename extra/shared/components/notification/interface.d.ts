import { ColorType } from "@lonlat/shared/types";

export interface NotificationProps {
  id: number;
  message: string;
  expiration?: number; // in ms. if -1 never expire
  type?: ColorType;
  canClose?: boolean;
  withLoader?: boolean;
  onRemove?: () => void;
}
export type NotificationOptions = Omit<Partial<NotificationProps>, "message">;
