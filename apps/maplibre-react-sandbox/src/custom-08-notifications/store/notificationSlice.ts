import { createSlice } from "@reduxjs/toolkit";

type NotificationState = {
  messages: string[];
};

const initialState: NotificationState = {
  messages: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
});

export default notificationSlice.reducer;
