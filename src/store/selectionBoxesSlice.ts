/* eslint-disable no-param-reassign */
// Modifying immutable data is allowed here since redux toolkit internally uses immer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionBoxesState {
  from: {
    id: number;
  };
  to: {
    id: number;
  };
}

const initialState: SelectionBoxesState = {
  from: {
    id: 0,
  },
  to: {
    id: 0,
  },
};

export const selectionBoxesSlice = createSlice({
  initialState,
  name: "selectedAirports",
  reducers: {
    selectedAirportChanged: (
      state: SelectionBoxesState,
      action: PayloadAction<{
        type: "from" | "to";
        id: number;
      }>,
    ) => {
      if (action.payload.type === "from") {
        state.from.id = action.payload.id;
      } else {
        state.to.id = action.payload.id;
      }
    },
    selectedAirportRemoved: (
      state: SelectionBoxesState,
      action: PayloadAction<{
        type: "from" | "to";
      }>,
    ) => {
      if (action.payload.type === "from") {
        state.from.id = 0;
      } else {
        state.to.id = 0;
      }
    },

  },
});

export const { selectedAirportChanged, selectedAirportRemoved } = selectionBoxesSlice.actions;

export default selectionBoxesSlice.reducer;
