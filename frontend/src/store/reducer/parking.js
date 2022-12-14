import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getRoomInfoService, requestCheckoutRoomService, getAllCheckoutRequestService } from 'services/renting';
import { getParkingInfoService, registerParkingService, deleteParkingService } from 'services/parking';
import { getRoomInfo } from './renting';

const initialState = {
  parking: {
    loading: false,
    isSuccess: false,
    data: {}
  }
};

export const parkingSlice = createSlice({
  name: 'renting',
  initialState,
  reducers: {
    reset(state) {
      state.parking.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParkingInfo.pending, (state) => {
        state.parking.loading = true;
      })
      .addCase(getParkingInfo.fulfilled, (state, action) => {
        state.parking.loading = false;
        state.parking.data = action.payload;
      })
      .addCase(registerParking.pending, (state) => {
        state.parking.loading = true;
      })
      .addCase(registerParking.fulfilled, (state, action) => {
        state.parking.loading = false;
        state.parking.isSuccess = true;
        state.parking.data = action.payload;
      })
      .addCase(deleteParking.pending, (state) => {
        state.parking.loading = true;
      })
      .addCase(deleteParking.fulfilled, (state) => {
        state.parking.loading = false;
        state.parking.isSuccess = false;
        state.parking.data = {};
      })
  },
});
export const selectParkingState = createSelector([(state) => state.parking], (parking) => parking);

export const getParkingInfo = createAsyncThunk('parking/getParkingInfo', async (_, { rejectWithValue }) => {
  try {
    const response = await getParkingInfoService();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const registerParking = createAsyncThunk('parking/registerParking', async (createData, { rejectWithValue, getState, dispatch }) => {
  try {
    dispatch(getRoomInfo());
    const roomId = getState().renting.roomInfo.data.roomId;
    const response = await registerParkingService({
      roomId,
      ...createData
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
export const deleteParking = createAsyncThunk('parking/deleteParking', async (parkingId, { rejectWithValue }) => {
  try {
    const response = await deleteParkingService(parkingId);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});


export const { reset } = parkingSlice.actions;
export default parkingSlice.reducer;
