import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

type ErrorCode = number | 1 | 2 | 3 | null;

type GeolocationState = {
  enabled: boolean;
  coords: [number, number] | null;
  accuracy: number | null;
  status: "off" | "waiting" | "on" | "error";

  // PERMISSION_DENIED: 1;
  // POSITION_UNAVAILABLE: 2;
  // TIMEOUT: 3;
  errorCode: ErrorCode;
};

const initialState: GeolocationState = {
  enabled: false,
  coords: null,
  accuracy: null,
  status: "off",
  errorCode: null,
};

let watchId: number | null = null;

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    enabledChanged(state, action: PayloadAction<boolean>) {
      const enabled = action.payload;
      if (state.enabled === enabled) {
        return;
      }

      if (!state.enabled) {
        state.status = "waiting";
      } else {
        state.status = "off";
      }
      state.coords = null;
      state.enabled = action.payload;
      state.errorCode = null;
    },
    positionUpdated(state, action: PayloadAction<{ coords: [number, number]; accuracy: number }>) {
      const { coords, accuracy } = action.payload;
      console.log("positionUpdated", coords, accuracy);
      state.coords = coords;
      state.accuracy = accuracy;
      state.status = "on";
      state.errorCode = null;
    },
    positionErrored(state, action: PayloadAction<ErrorCode>) {
      state.status = "error";
      state.errorCode = action.payload;
      state.coords = null;
      console.log("positionErrored", state.errorCode);
    },
  },
});

export default geolocationSlice.reducer;

export const { enabledChanged, positionUpdated, positionErrored } = geolocationSlice.actions;

export const selectGeolocationCoords = (state: RootState) => state.geolocation.coords;
export const selectGeolocationEnabled = (state: RootState) => state.geolocation.enabled;

export const activationChanged = (enabled: boolean) => (dispatch: AppDispatch) => {
  dispatch(enabledChanged(enabled));
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
            dispatch(enabledChanged(false));
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
