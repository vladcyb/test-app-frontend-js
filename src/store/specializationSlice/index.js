import { createSlice } from '@reduxjs/toolkit';
import { SpecializationThunk } from './thunk';

const initialState = {
  loading: false,
  data: [],
};

export const specializationSlice = createSlice({
  name: 'specialization',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.data.push(payload);
    },
    delete: (state, { payload }) => {
      const index = state.data.findIndex((spec) => spec.id === payload);
      if (index >= 0) {
        state.data.splice(index, 1);
      }
    },
    set: (state, { payload }) => {
      state.data = payload;
    },
    edit: (state, { payload }) => {
      const index = state.data.findIndex((spec) => spec.id === payload.id);
      if (index >= 0) {
        state.data[index] = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SpecializationThunk.update.pending, (state) => {
        state.loading = true;
      })
      .addCase(SpecializationThunk.update.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(SpecializationThunk.update.rejected, (state) => {
        state.loading = false;
      })
      .addCase(SpecializationThunk.add.pending, (state) => {
        state.loading = true;
      })
      .addCase(SpecializationThunk.add.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(SpecializationThunk.add.rejected, (state) => {
        state.loading = false;
      })
      .addCase(SpecializationThunk.edit.pending, (state) => {
        state.loading = true;
      })
      .addCase(SpecializationThunk.edit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(SpecializationThunk.edit.rejected, (state) => {
        state.loading = false;
      });
  },
});
