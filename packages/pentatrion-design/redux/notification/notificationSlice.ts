import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageOptions, parseError } from "~design";

type NotificationState = {
  messages: Message[];
};

const initialState: NotificationState = {
  messages: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    errorAdded: {
      reducer(state, action: PayloadAction<Message>) {
        state.messages.push(action.payload);
      },
      prepare(err: any) {
        const errorMessage = parseError(err);
        if (errorMessage) {
          const [content, options] = errorMessage;
          const {
            expiration = 5000,
            color = "red",
            canClose = true,
            withLoader = false,
          } = options || {};
          const id = nanoid();
          return {
            payload: { id, content, expiration, color, canClose, withLoader },
          };
        } else {
          throw err;
        }
      },
    },
    messageAdded: {
      reducer(state, action: PayloadAction<Message>) {
        state.messages.push(action.payload);
      },
      prepare(content: string, options?: MessageOptions) {
        const {
          expiration = 5000,
          color = "yellow",
          canClose = true,
          withLoader = false,
        } = options || {};
        const id = nanoid();
        return {
          payload: { id, content, expiration, color, canClose, withLoader },
        };
      },
    },
    messageRemoved(state, action: PayloadAction<string>) {
      const messageId = action.payload;
      state.messages = state.messages.filter((m) => m.id !== messageId);
    },
  },
});

export default notificationSlice.reducer;

export const { messageAdded, messageRemoved, errorAdded } = notificationSlice.actions;

export const selectMessages: (state: any) => Message[] = (state) => state.notification.messages;
