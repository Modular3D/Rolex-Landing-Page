import { configureStore } from '@reduxjs/toolkit';
import DisplayStateReducer from '../features/State/DisplayState';

export const store = configureStore({
  reducer: {
    ColorsDisplay: DisplayStateReducer,
  },
});
