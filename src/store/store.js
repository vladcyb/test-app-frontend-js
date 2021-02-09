import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { specializationSlice } from './specializationSlice';
import { masterSlice } from './masterSlice';

export const store = configureStore({
  reducer: combineReducers({
    specialization: specializationSlice.reducer,
    master: masterSlice.reducer,
  }),
});
