import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageOptions } from "pentatrion-design";

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
    messageAdded: {
      reducer(state, action: PayloadAction<Message>) {
        state.messages.push(action.payload);
      },
      prepare(content: string, options?: MessageOptions) {
        const {
          expiration = 5000,
          color = "primary",
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

export const { messageAdded, messageRemoved } = notificationSlice.actions;

export const selectMessages: (state: any) => Message[] = (state) => state.notification.messages;
