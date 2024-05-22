export type ThemeColor = "yellow" | "gray" | "red" | "orange" | "green" | "blue";

export type MessageOptions = Partial<Omit<Message, "message" | "id">>;

export interface Message {
  id: string;
  content: string;
  expiration: number; // in ms. if -1 never expire
  color: ThemeColor;
  canClose: boolean;
  withLoader: boolean;
}
