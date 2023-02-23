import { configureStore } from '@reduxjs/toolkit';

import airportsReducer from './airportsSlice';
import connectionsReducer from './connectionsSlice';
import selectionBoxesReducer from './selectionBoxesSlice';

export const store = configureStore({

  reducer: {
    airports: airportsReducer,
    connections: connectionsReducer,

    selectedAirports: selectionBoxesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
