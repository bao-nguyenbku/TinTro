import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoomInfoService, requestCheckoutRoomService, getAllCheckoutRequestService, requestCancelCheckoutRoomService, acceptCheckoutRoomService } from 'services/renting';

const initialState = {
  renting: {
    loading: false,
    isSuccess: false,
    error: undefined,
    action: '',
    data: {},
  },
  roomInfo: {
    loading: false,
    isSuccess: false,
    error: undefined,
    data: {},
  },
  adminRenting: {
    loading: false,
    checkoutRequestList: [],
    error: undefined,
  },
};

export const rentingSlice = createSlice({
  name: 'renting',
  initialState,
  reducers: {
    resetError(state) {
      state.renting.error = undefined;
      state.roomInfo.error = undefined;
    },
    reset(state) {
      state.renting = {
        loading: false,
        isSuccess: false,
        error: undefined,
        action: '',
        data: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomInfo.pending, (state) => {
        state.roomInfo.loading = true;
      })
      .addCase(getRoomInfo.fulfilled, (state, action) => {
        state.roomInfo.loading = false;
        state.roomInfo.data = action.payload || {};
      })
      .addCase(getRoomInfo.rejected, (state) => {
        state.roomInfo.loading = false;
      })
      .addCase(requestCheckoutRoom.pending, (state) => {
        state.renting.loading = true;
      })
      .addCase(requestCheckoutRoom.fulfilled, (state, action) => {
        state.renting.loading = false;
        state.renting.data = action.payload.data;
        state.renting.action = action.payload.action;
        state.renting.isSuccess = true;
      })
      .addCase(getAllCheckoutRequest.pending, (state) => {
        state.adminRenting.loading = true;
      })
      .addCase(getAllCheckoutRequest.fulfilled, (state, action) => {
        state.adminRenting.loading = false;
        state.adminRenting.checkoutRequestList = action.payload;
      })
  },
});
export const selectRentingState = createSelector([(state) => state.renting], (renting) => renting);

export const requestCheckoutRoom = createAsyncThunk('renting/requestCheckoutRoom', async ({ rentingId, action }, { rejectWithValue, dispatch }) => {
  try {
    let response;
    if (action === 'REQUEST') {
      response = await requestCheckoutRoomService({ rentingId });
    }
    if (action === 'CANCEL') {
      response = await requestCancelCheckoutRoomService({ rentingId });
    }
    dispatch(getRoomInfo());
    return {
      data: response.data,
      action,
    };
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
export const getRoomInfo = createAsyncThunk('accommodation/getRoomInfo', async (_, { rejectWithValue }) => {
  try {
    const response = await getRoomInfoService();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const getAllCheckoutRequest = createAsyncThunk('renting/getAllCheckoutRequest', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllCheckoutRequestService();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
export const acceptCheckoutRoom = createAsyncThunk('renting/acceptCheckoutRoom', async (rentingId, { rejectWithValue, dispatch }) => {
  try {
    const response = await acceptCheckoutRoomService(rentingId);
    dispatch(getAllCheckoutRequest());
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
export const cancelRequestCheckoutByOwner = createAsyncThunk('renting/cancelRequestCheckoutByOwner', async (rentingId, { rejectWithValue, dispatch }) => {
  try {
    const response = await requestCancelCheckoutRoomService({ rentingId, role: 'ADMIN' });
    dispatch(getAllCheckoutRequest());
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
export const acceptOwnerRequestCheckout = createAsyncThunk('renting/acceptOwnerRequestCheckout', async (rentingId, { rejectWithValue, dispatch }) => {
  try {
    dispatch(acceptCheckoutRoom(rentingId));
    dispatch(getRoomInfo());
    return null;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const { reset } = rentingSlice.actions;
export default rentingSlice.reducer;
