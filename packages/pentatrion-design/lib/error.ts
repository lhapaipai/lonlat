import { MessageOptions } from "../types.d";

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
    return [err.message || "An error occured", { color: "red" }];
  }
  return null;
}
