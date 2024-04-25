import { ThemeColor } from "../types";

export type MessageOptions = Partial<Omit<Message, "message" | "id">>;

export interface Message {
  id: string;
  content: string;
  expiration: number; // in ms. if -1 never expire
  color: ThemeColor;
  canClose: boolean;
  withLoader: boolean;
}

export function isErrorLike(err: any): err is Error {
  if (err instanceof Error) {
    return true;
  } else if (err.name !== undefined && err.message !== undefined) {
    return true;
  }

  return false;
}

export function parseError(err: any): [string, MessageOptions] | null {
  if (isErrorLike(err)) {
    return [err.message || "An error occured", { color: "danger" }];
  }
  return null;
}
