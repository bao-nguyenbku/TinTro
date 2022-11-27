import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import request from '../../utils/axios';

// INITIAL STATE
const initialState = {
  name: '',
  email: '',
  phone: '',
  loading: false,
  error: false,
};

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

export const logIn = createAsyncThunk(async ({ email, password }) => {
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
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, _) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, _) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(logIn.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, _) => {
      state.loading = false;
      // TODO: set token in local storage, save user data in state object
    });
    builder.addCase(logIn.rejected, (state, _) => {
      state.error = true;
      state.loading = false;
    });
  },
});
// --------------------------- SELECTORS ---------------------------
export const selectUserState = createSelector([(state) => state.user], (userState) => userState);
// Action creators are generated for each case reducer function
export default userSlice.reducer;
