import { ThemeColor } from "pentatrion-design/types";
import { FetchError } from "./fetch";

export type MessageOptions = Partial<Omit<Message, "message" | "id">>;

export interface Message {
  id: string;
  content: string;
  expiration: number; // in ms. if -1 never expire
  color: ThemeColor;
  canClose: boolean;
  withLoader: boolean;
}

export function parseError(err: any): [string, MessageOptions] | null {
  if (err instanceof FetchError || err.name === "FetchError") {
    return [err.message, { color: "danger" }];
  } else if (err instanceof Error || err.name === "Error") {
    return [err.message, { color: "danger" }];
  } else if ((err as any).message) {
    return [(err as any).message, { color: "danger" }];
  }
  return null;
}
