/* eslint-disable no-param-reassign */
// Modifying immutable data is allowed here since redux toolkit internally uses immer
import { Connections } from "../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectionsState {
  connections: Connections;
  loadingState: "success" | "fail" | "pending";
}

const initialState: ConnectionsState = {
  connections: {},
  loadingState: "pending",
};

export const connectionsSlice = createSlice({
  initialState,
  name: "connections",
  reducers: {
    // Action to dispatch if the GET /Connections query is successful.
    // This populates the airports in the state, so it's reusable by all components.
    connectionsLoaded: (
      state: ConnectionsState,
      action: PayloadAction<{
        connections: Connections;
      }>,
    ) => {
      state.connections = action.payload.connections;
      state.loadingState = "success";
    },
    // Action to dispatch while the GET /Connections query is running.
    connectionsLoading: (
      state: ConnectionsState,
    ) => {
      state.loadingState = "pending";
    },
    // Action to dispatch if the GET /Connections query fails.
    connectionsLoadingFailed: (
      state: ConnectionsState,
    ) => {
      state.loadingState = "fail";
    },
  },
});

export const { connectionsLoaded, connectionsLoadingFailed, connectionsLoading } = connectionsSlice.actions;

export default connectionsSlice.reducer;
