import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoomInfoService, requestCheckoutRoomService } from 'services/renting';

const initialState = {
  renting: {
    loading: false,
    isSuccess: false,
    error: undefined,
    data: {}
  },
  roomInfo: {
    loading: false,
    isSuccess: false,
    error: undefined,
    data: {}
  }
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
        data: {}
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomInfo.pending, (state) => {
        state.roomInfo.loading = true;
      })
      .addCase(getRoomInfo.fulfilled, (state, action) => {
        state.roomInfo.loading = false;
        state.roomInfo.data = action.payload;
      })
      .addCase(requestCheckoutRoom.pending, (state) => {
        state.renting.loading = true;
      })
      .addCase(requestCheckoutRoom.fulfilled, (state, action) => {
        console.log(action.payload);
        state.renting.loading = false;
        state.renting.data = action.payload;
        state.renting.isSuccess = true;
      })
  },
});
export const selectRentingState = createSelector([(state) => state.renting], (renting) => renting);

export const requestCheckoutRoom = createAsyncThunk(
  'renting/requestCheckoutRoom',
  async ({ rentingId }, { rejectWithValue }) => {
    try {
      const response = await requestCheckoutRoomService({ rentingId });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message
      })
    }

  }
)
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



export const { reset } = rentingSlice.actions;
export default rentingSlice.reducer;
