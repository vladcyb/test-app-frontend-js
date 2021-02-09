import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import actions from './actions';

export const MasterThunk = {
  update: createAsyncThunk(
    'master/update',
    async (specId, { dispatch }) => {
      const result = await API.Master.get(specId);
      dispatch(actions.set(result.data.result));
    },
  ),
  delete: createAsyncThunk(
    'master/delete',
    async (id, { dispatch }) => {
      const result = await API.Master.delete(id);
      if (result.data.ok) {
        dispatch(actions.delete(id));
      }
    },
  ),
  add: createAsyncThunk(
    'master/add',
    async (props, {
      dispatch,
      rejectWithValue,
    }) => {
      const result = await API.Master.add(props);
      if (result.data.ok) {
        dispatch(actions.add(result.data.result));
      } else {
        return rejectWithValue(result.data);
      }
      return result.data;
    },
  ),
  edit: createAsyncThunk(
    'master/edit',
    async (props, { dispatch, rejectWithValue }) => {
      const requestResult = await API.Master.edit(props);
      const { ok, result, error } = requestResult.data;
      if (ok) {
        await dispatch(actions.edit(result));
      } else {
        return rejectWithValue({ error });
      }
      return result;
    },
  ),
};
