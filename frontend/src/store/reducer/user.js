import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { jwtParse, setToken, tokenKey } from 'utils/token';

import request from '../../utils/axios';

// INITIAL STATE
const initialState = {
  currentUser: {},
  loading: false,
  error: null,
};

// --------------------------- THUNKS ---------------------------
export const register = createAsyncThunk('users/register', async ({ name, email, phone, password, reEnterPassword, done }, { rejectWithValue }) => {
  try {
    const response = await request.post('/auth/register', {
      name,
      email,
      phone,
      password,
      reEnterPassword,
    });
    if (done) done();
    return response.data.json();
  } catch (err) {
    return rejectWithValue({ statusCode: err.response.data.statusCode, message: err.response.data.message });
  }
});

export const logIn = createAsyncThunk('users/login', async ({ email, password, done }, { rejectWithValue }) => {
  try {
    const response = await request.post('/auth/login', {
      email,
      password,
    });
    if (done) done();
    return response.data;
  } catch (err) {
    if (err.response) {
      return rejectWithValue({ statusCode: err.response.data.statusCode, message: err.response.data.message });
    }
    if (!err.response) {
      return rejectWithValue({ statusCode: 500, message: err.message });
    }
    return rejectWithValue({ statusCode: 500, message: 'Something went wrong' });
  }
});
// --------------------------- SLICE ---------------------------
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetData: (_state, _) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, _) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      if (action.payload.statusCode === 400) state.error = 'Email hoặc số điện thoại đã tồn tại.';
      else state.error = Array.isArray(action.payload.message) ? action.payload.message[0] : action.payload.message;
      state.loading = false;
    });
    builder.addCase(logIn.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      setToken(tokenKey, action.payload.access_token);
      const decoded = jwtParse(action.payload.access_token);
      state.currentUser = { ...decoded, id: decoded.sub };
    });
    builder.addCase(logIn.rejected, (state, action) => {
      if (action.payload.statusCode === 401) state.error = 'Email hoặc mật khẩu không đúng.';
      else state.error = Array.isArray(action.payload.message) ? action.payload.message[0] : action.payload.message;
      state.loading = false;
    });
  },
});
// --------------------------- SELECTORS ---------------------------
export const selectUserState = createSelector([(state) => state.user], (userState) => userState);
// Action creators are generated for each case reducer function
const { resetData } = userSlice.actions;
export { resetData };

export default userSlice.reducer;
