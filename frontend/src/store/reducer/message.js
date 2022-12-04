import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/axios';

const initialState = {
  error: null,
  loading: false,
  messageSections: [],
  messages: [],
};

//* ------------------------------ WEB SOCKETS ------------------------- */

export const sendMessage = createAsyncThunk('message/sendMessage', async ({ messageText, socket }, { rejectWithValue }) => {
  try {
    socket.emit('message-sent-from-client', messageText);
    return { messageText };
  } catch (err) {
    return rejectWithValue({ message: err?.message || err || 'Something went wrong!' });
  }
});

// * ------------------------------ THUNKS ------------------------- */
export const fetchMessageSections = createAsyncThunk('messages/fetchMessageSections', async ({ done }, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await request.get('/message-sections');
    const { data } = response;
    if (done) done();
    return fulfillWithValue({ messageSections: data.messageSections });
  } catch (e) {
    if (e.response) return rejectWithValue({ statusCode: e.response.data.statusCode, message: e.response.data.message });
    return rejectWithValue({ statusCode: 500, message: 'Internal server error' });
  }
});

//* ------------------------------ Slice ------------------------- */
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clearMessageSections(state, _action) {
      state.messageSections = [];
      state.messages = [];
      state.error = null;
      state.loading = false;
    },
    pushMessage(state, action) {
      state.messages = [...state.messages, action.payload.message];
    },
    setMessages(state, action) {
      state.messages = action.payload.messages;
    },
  },
  extraReducers: (builder) => {
    // * ------------------------------ FETCH MESSAGE SECTIONS ------------------------- */
    builder.addCase(fetchMessageSections.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // store the sections in state
      state.messageSections = action.payload.messageSections;
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

const { clearMessageSections, pushMessage, setMessages } = messageSlice.actions;
export { clearMessageSections, pushMessage, setMessages };

export default messageSlice.reducer;
