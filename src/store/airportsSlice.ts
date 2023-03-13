/* eslint-disable no-param-reassign */
// Modifying immutable data is allowed here since redux toolkit internally uses immer
import { AirportData } from "../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AirportsState {
  airports: AirportData[];
  loadingState: "success" | "fail" | "pending";
}

const initialState: AirportsState = {
  airports: [],
  loadingState: "pending",
};

export const airportsSlice = createSlice({
  initialState,
  name: "airports",
  reducers: {
    // Action to dispatch if the GET /Airports query is successful.
    // This populates the airports in the state, so it's reusable by all components.
    airportsLoaded: (
      state: AirportsState,
      action: PayloadAction<{
        airports: AirportData[];
      }>,
    ) => {
      state.airports = action.payload.airports.map((airport) => airport);
      state.loadingState = "success";
    },
    // Action to dispatch while the GET /Airport query is running.
    airportsLoading: (
      state: AirportsState,
    ) => {
      state.loadingState = "pending";
    },
    // Action to dispatch if the GET /Airport query fails.
    airportsLoadingFailed: (
      state: AirportsState,
    ) => {
      state.loadingState = "fail";
    },
  },
});

export const { airportsLoaded, airportsLoadingFailed, airportsLoading } = airportsSlice.actions;

export default airportsSlice.reducer;
