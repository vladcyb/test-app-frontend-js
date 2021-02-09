import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import actions from './actions';

export const SpecializationThunk = {
  update: createAsyncThunk(
    'specialization/update',
    async (arg, { dispatch }) => {
      const result = await API.Specialization.get();
      dispatch(actions.set(result.data.result));
    },
  ),
  add: createAsyncThunk(
    'specialization/add',
    async (props, { dispatch }) => {
      const result = await API.Specialization.add(props);
      dispatch(actions.add(result.data.result));
    },
  ),
  delete: createAsyncThunk(
    'specialization/delete',
    async (id, { dispatch, rejectWithValue }) => {
      const apiResult = await API.Specialization.delete(id);
      const { ok, error } = apiResult.data;
      if (ok) {
        const res = await dispatch(actions.delete(id));
        return res;
      }
      return rejectWithValue({ error });
    },
  ),
  edit: createAsyncThunk(
    'specialization/edit',
    async (specialization, { dispatch, rejectWithValue }) => {
      const editResult = await API.Specialization.edit(specialization);
      const { ok, result } = editResult.data;
      if (ok) {
        await dispatch(actions.edit(result));
      } else {
        return rejectWithValue({ error: 'Something went wrong!' });
      }
      return result;
    },
  ),
};
