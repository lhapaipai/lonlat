import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "~/store";

type ErrorCode = number | 1 | 2 | 3 | null;
type Status = "off" | "waiting" | "on" | "error";

export type GeolocationState = {
  status: Status;
  coords: [number, number] | null;
  accuracy: number | null;

  // PERMISSION_DENIED: 1;
  // POSITION_UNAVAILABLE: 2;
  // TIMEOUT: 3;
  errorCode: ErrorCode;

  lockCamera: boolean;
  showAccuracyCircle: boolean;
};

const initialState: GeolocationState = {
  status: "off",
  coords: null,
  accuracy: null,
  errorCode: null,

  lockCamera: true,
  showAccuracyCircle: true,
};

let watchId: number | null = null;

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    showAccuracyCircleChanged(state, action: PayloadAction<boolean>) {
      state.showAccuracyCircle = action.payload;
    },
    lockCameraChanged(state, action: PayloadAction<boolean>) {
      state.lockCamera = action.payload;
    },
    statusChanged(state, action: PayloadAction<Status>) {
      const status = action.payload;
      if (state.status === status) {
        return;
      }

      state.status = status;
      state.accuracy = null;
      state.coords = null;
      state.errorCode = null;
    },
    positionUpdated(state, action: PayloadAction<{ coords: [number, number]; accuracy: number }>) {
      const { coords, accuracy } = action.payload;

      state.status = "on";
      state.coords = coords;
      state.accuracy = accuracy;
      state.errorCode = null;
    },
    positionErrored(state, action: PayloadAction<ErrorCode>) {
      state.status = "error";
      state.coords = null;
      state.accuracy = null;
      state.errorCode = action.payload;
    },
  },
});

export default geolocationSlice.reducer;

export const {
  showAccuracyCircleChanged,
  lockCameraChanged,
  statusChanged,
  positionUpdated,
  positionErrored,
} = geolocationSlice.actions;

export const selectGeolocationCoords = (state: RootState) => state.geolocation.coords;
export const selectGeolocationStatus = (state: RootState) => state.geolocation.status;
export const selectGeolocation = (state: RootState) => state.geolocation;

export const activationChanged = (enabled: boolean) => (dispatch: AppDispatch) => {
  dispatch(statusChanged(enabled ? "waiting" : "off"));

  if (enabled) {
    if (watchId === null) {
      watchId = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude, accuracy } }) => {
          dispatch(
            positionUpdated({
              coords: [longitude, latitude],
              accuracy,
            }),
          );
        },
        ({ code }) => {
          dispatch(positionErrored(code));
          if (code === GeolocationPositionError.PERMISSION_DENIED) {
            if (watchId) {
              navigator.geolocation.clearWatch(watchId);
              watchId = null;
            }
          }
        },
        {
          enableHighAccuracy: true,
        },
      );
    }
  } else if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
};
