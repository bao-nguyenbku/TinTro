import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WS_BASE_URL } from '@env';
import { io } from 'socket.io-client';
import request from '../../utils/axios';

const initialState = {
  error: null,
  loading: false,
  messageSections: [],
  messages: [],
  ws: null,
};

//* ------------------------------ WEB SOCKETS ------------------------- */
const socketUrl = `${WS_BASE_URL}/message`;
export const initWebsocket = createAsyncThunk('message/initWebsocket', async ({ token, messageSectionId, receiverId }, { rejectWithValue, dispatch }) => {
  try {
    const socket = io(socketUrl, {
      auth: {
        token,
      },
      query: {
        messageSectionId,
        receiverId,
      },
    });
    // * Add listners to socket * //
    socket.on('connect', () => {
      console.log('Connected to websocket');
    });
    socket.emit('fetch-all-messages');
    socket.on('client-all-past-messages', (data) => {
      dispatch(setMessages(data));
    });
    socket.on('client-receive-message', (data) => {
      dispatch(pushMessage({ message: data }));
    });
    return socket;
  } catch (err) {
    return rejectWithValue({ message: err?.message || err || 'Something went wrong!' });
  }
});

export const sendMessage = createAsyncThunk('message/sendMessage', async ({ messageText }, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const socket = state.message.ws;
    return socket.emit('message-sent-from-client', messageText);
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
      state.ws.disconnect();
      state.ws = null;
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
    // * ------------------------------ INIT WEBSOCKET ------------------------- */
    builder.addCase(initWebsocket.fulfilled, (state, action) => {
      state.ws = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(initWebsocket.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
      state.ws = null;
    });
    builder.addCase(initWebsocket.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
      state.ws = null;
    });
  },
});

const { clearMessageSections, pushMessage, setMessages } = messageSlice.actions;
export { clearMessageSections, pushMessage, setMessages };

export default messageSlice.reducer;
