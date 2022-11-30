import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import request from '../../utils/axios';

const initialState = {
  error: null,
  loading: false,
  messageSections: [],
};

export const fetchMessageSections = createAsyncThunk('messages/fetchMessageSections', async ({ done }, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await request.get('/users/messages/past-messagers');
    const { data } = response;
    if (done) done();
    return fulfillWithValue(data);
  } catch (e) {
    if (e.response) return rejectWithValue({ statusCode: e.response.data.statusCode, message: e.response.data.message });
    return rejectWithValue({ statusCode: 500, message: 'Internal server error' });
  }
});

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessageSections.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = null;
      // TODO store the sections in state
    });
    builder.addCase(fetchMessageSections.rejected, (state, action) => {
      state.error = action.message;
      state.loading = false;
    });
    builder.addCase(fetchMessageSections.pending, (state, _) => {
      state.loading = true;
    });
  },
});

export default messageSlice.reducer;
