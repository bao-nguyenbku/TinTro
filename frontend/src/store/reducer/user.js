import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import request from '../../utils/axios';

// INITIAL STATE
const userAdapater = createEntityAdapter();
const initialState = userAdapater.getInitialState({
  status: 'idle',
});

// --------------------------- THUNKS ---------------------------
export const register = createAsyncThunk(async ({ name, email, phone, password, reEnterPassword }) => {
  const response = await request.post('/auth/register', {
    data: {
      name,
      email,
      phone,
      password,
      reEnterPassword,
    },
  });
  return response.json();
});

export const signIn = createAsyncThunk(async ({ email, password }) => {
  const response = await request.post('/auth/login', {
    data: {
      email,
      password,
    },
  });
  return response.json();
});
// --------------------------- SLICE ---------------------------
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {},
});
// --------------------------- SELECTORS ---------------------------
export const selectUserState = createSelector([(state) => state.user], (userState) => userState);
// Action creators are generated for each case reducer function
export default userSlice.reducer;
