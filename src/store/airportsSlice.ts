// Modifying immutable data is allowed here since redux toolkit internally uses immer
/* eslint-disable functional/immutable-data */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airports } from 'src/types/types';

interface AirportsState {
  airports: Airports;
  loadingState: 'success' | 'fail' | 'pending';
}

const initialState: AirportsState = {
  airports: [],
  loadingState: 'pending',
};

export const airportsSlice = createSlice({
  initialState,
  name: 'airports',
  reducers: {
    // Action to dispatch if the GET /Airports query is successful.
    // This populates the airports in the state, so it's reusable by all components.
    airportsLoaded: (
      state: AirportsState,
      action: PayloadAction<{
        airports: Airports;
      }>,
    ) => {
      state.airports = action.payload.airports.map(airport => airport);
      state.loadingState = 'success';
    },
    // Action to dispatch while the GET /Airports query is running.
    airportsLoading: (
      state: AirportsState,
    ) => {
      state.loadingState = 'pending';
    },
    // Action to dispatch if the GET /Airports query fails.
    airportsLoadingFailed: (
      state: AirportsState,
    ) => {
      state.loadingState = 'fail';
    },
  },
});

export const { airportsLoaded, airportsLoadingFailed, airportsLoading } =
  airportsSlice.actions;

export default airportsSlice.reducer;
