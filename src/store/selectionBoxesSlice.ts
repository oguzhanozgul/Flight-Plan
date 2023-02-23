// Modifying immutable data is allowed here since redux toolkit internally uses immer
/* eslint-disable functional/immutable-data */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  name: 'selectedAirports',
  reducers: {
    selectedAirportChanged: (
      state: SelectionBoxesState,
      action: PayloadAction<{
        type: 'from' | 'to';
        id: number;
      }>,
    ) => {
      if (action.payload.type === 'from') {
        state.from.id = action.payload.id;
      } else {
        state.to.id = action.payload.id;
      }
    },

  },
});

export const { selectedAirportChanged } =
  selectionBoxesSlice.actions;

export default selectionBoxesSlice.reducer;
