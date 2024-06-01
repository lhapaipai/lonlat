import { Action, Middleware } from "@reduxjs/toolkit";
import { messageAdded } from "./notificationSlice";
import { parseError } from "../../lib";

export const errorCatcherMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (typeof action !== "function" && (action as Action).type.endsWith("/rejected")) {
      const errorMessage = parseError((action as any).error || {});
      if (errorMessage) {
        dispatch(messageAdded(...errorMessage));
      }
    }

    return next(action);
  };
