import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { Feature, LineString } from "geojson";
import { GeoOption, NoDataOption } from "pentatrion-design";
import { createNodataFeature } from "pentatrion-geo";

type DirectionState = {
  locations: (GeoOption | NoDataOption)[];
  route: Feature<LineString> | null;
};

const initialState: DirectionState = {
  locations: [createNodataFeature(), createNodataFeature()],
  route: null,
};

type LocationPayload = { index: number; feature: GeoOption | NoDataOption };

const directionSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    directionLocationsSorted(state, action: PayloadAction<(GeoOption | NoDataOption)[]>) {
      state.locations = action.payload;
    },
    directionLocationChanged(state, action: PayloadAction<LocationPayload>) {
      const { index, feature } = action.payload;
      if (state.locations[index] === undefined) {
        throw new Error("direction location index invalid");
      }

      const itemId = state.locations[index].id;
      feature.id = itemId;

      state.locations[index] = feature;
    },
    directionRouteChanged(state, action: PayloadAction<Feature<LineString> | null>) {
      state.route = action.payload;
    },
  },
});

export const directionLocationChangedAction =
  (payload: LocationPayload) => async (dispatch: AppDispatch) => {
    dispatch(directionLocationChanged(payload));
  };

export default directionSlice.reducer;

export const { directionLocationChanged, directionLocationsSorted, directionRouteChanged } =
  directionSlice.actions;

export const selectDirectionLocations = (state: RootState) => state.direction.locations;
export const selectDirectionRoute = (state: RootState) => state.direction.route;
