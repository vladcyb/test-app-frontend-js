import { createSlice } from '@reduxjs/toolkit';
import { MasterThunk } from './thunk';
import { SpecializationThunk } from '../specializationSlice/thunk';

const initialState = {
  loading: false,
  data: [],
};

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.data.push(payload);
    },
    delete: (state, { payload }) => {
      const index = state.data.findIndex((master) => master.id === payload);
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
      .addCase(MasterThunk.update.pending, (state) => {
        state.loading = true;
      })
      .addCase(MasterThunk.update.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(MasterThunk.update.rejected, (state) => {
        state.loading = false;
      })
      .addCase(MasterThunk.add.pending, (state) => {
        state.loading = true;
      })
      .addCase(MasterThunk.add.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(MasterThunk.add.rejected, (state) => {
        state.loading = false;
      })
      .addCase(MasterThunk.edit.pending, (state) => {
        state.loading = true;
      })
      .addCase(MasterThunk.edit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(MasterThunk.edit.rejected, (state) => {
        state.loading = false;
      })
      .addCase(SpecializationThunk.edit.fulfilled, (state, { payload }) => {
        state.data.forEach((master) => {
          if (master.Specialization.id === payload.id) {
            master.Specialization.title = payload.title;
          }
        });
      });
  },
});
