import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getRoomInfoService, requestCheckoutRoomService, getAllCheckoutRequestService } from 'services/renting';
import { registerWifiService, deleteWifiService, getWifiInfoService } from 'services/wifi';
import { getRoomInfo } from './renting';

const initialState = {
  wifi: {
    loading: false,
    isSuccess: false,
    data: {}
  }
};

export const wifiSlice = createSlice({
  name: 'renting',
  initialState,
  reducers: {
    reset(state) {
      state.wifi.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWifiInfo.pending, (state) => {
        state.wifi.loading = true;
      })
      .addCase(getWifiInfo.fulfilled, (state, action) => {
        state.wifi.loading = false;
        state.wifi.data = action.payload;
      })
      .addCase(registerWifi.pending, (state) => {
        state.wifi.loading = true;
      })
      .addCase(registerWifi.fulfilled, (state, action) => {
        state.wifi.loading = false;
        state.wifi.isSuccess = true;
        state.wifi.data = action.payload;
      })
      .addCase(deleteWifi.pending, (state) => {
        state.wifi.loading = true;
      })
      .addCase(deleteWifi.fulfilled, (state) => {
        state.wifi.loading = false;
        state.wifi.isSuccess = false;
        state.wifi.data = {};
      })
  },
});
export const selectWifiState = createSelector([(state) => state.wifi], (wifi) => wifi);

export const getWifiInfo = createAsyncThunk('wifi/getWifiInfo', async (_, { rejectWithValue, getState }) => {
  const roomId = getState().renting.roomInfo.data.roomId;
  try {
    const response = await getWifiInfoService(roomId);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const registerWifi = createAsyncThunk('wifi/registerWifi', async (createData, { rejectWithValue, getState, dispatch }) => {
  try {
    dispatch(getRoomInfo());
    const { roomId } = getState().renting.roomInfo.data;
    const { roomName } = getState().renting.roomInfo.data.room;
    const response = await registerWifiService({
      roomId,
      ...createData,
      name: roomName
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
export const deleteWifi = createAsyncThunk('wifi/deleteWifi', async (wifiId, { rejectWithValue }) => {
  try {
    const response = await deleteWifiService(wifiId);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});


export const { reset } = wifiSlice.actions;
export default wifiSlice.reducer;
