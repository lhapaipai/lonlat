import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { customFetch } from "pentatrion-design";

export interface CounterSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export default counterSlice.reducer;

export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectCounterStatus = (state: RootState) => state.counter.status;

export const { decrement, increment, incrementByAmount } = counterSlice.actions;

export const basicAsyncError = createAsyncThunk("counter/basicAsyncError", async () => {
  throw new Error("async thunk error");
});

export const fetchAsyncError = createAsyncThunk("counter/fetchAsyncError", async (data: number) => {
  const response = await customFetch(`http://unknown/incr/${data}`);
  return response.data;
});

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
