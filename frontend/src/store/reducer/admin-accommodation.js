import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms } from 'services/admin-accommodation';
import { requestRenterCheckoutByOwnerService, getAllRenterByRoomIdService } from 'services/renting';
import { getAllCheckoutRequest } from './renting';

const initialState = {
  rooms: {
    loading: false,
    data: []
  },
  renters: {
    loading: false,
    data: []
  },
  requestCheckout: {
    loading: false,
    isSuccess: false,
    data: {},
  }
};

export const adminAccommodationSlice = createSlice({
  name: 'adminAccommodation',
  initialState,
  reducers: {
    resetError() {
     
    },
    reset() {
      // state.renting = {
      //   loading: false,
      //   isSuccess: false,
      //   error: undefined,
      //   data: {}
      // };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoomByOwner.pending, (state) => {
        state.rooms.loading = true;
      })
      .addCase(getAllRoomByOwner.fulfilled, (state, action) => {
        state.rooms.loading = false;
        state.rooms.data = action.payload;
      })
      .addCase(getAllRenterByRoomId.pending, (state) => {
        state.renters.loading = true;
      })
      .addCase(getAllRenterByRoomId.fulfilled, (state, action) => {
        state.renters.loading = false;
        state.renters.data = action.payload;
      })
      .addCase(requestRenterCheckoutByOwner.pending, (state) => {
        state.requestCheckout.loading = true;
      })
      .addCase(requestRenterCheckoutByOwner.fulfilled, (state, action) => {
        state.requestCheckout.loading = false;
        state.requestCheckout.isSuccess = true;
        state.requestCheckout.data = action.payload;
      })
  },
});
export const selectAdminAccommodationState = createSelector([(state) => state.adminAccommodation], (adminAccommodation) => adminAccommodation);

export const getAllRoomByOwner = createAsyncThunk(
  'renting/getAllRoomByOwner',
  async (_, { rejectWithValue, getState }) => {
    const adminId = getState().user.currentUser.id;
    try {
      const response = await getAllRooms(adminId);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message
      })
    }
  }
)

export const requestRenterCheckoutByOwner = createAsyncThunk(
  'renting/requestRenterCheckoutByOwner',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await requestRenterCheckoutByOwnerService(data);
      dispatch(getAllCheckoutRequest());
      return response.data;
    } catch (error) {
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message
      })
    }
  }
)
export const getAllRenterByRoomId = createAsyncThunk(
  'renting/getAllRenterByRoomId',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await getAllRenterByRoomIdService(roomId);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message
      })
    }
  }
)

export const { reset } = adminAccommodationSlice.actions;
export default adminAccommodationSlice.reducer;
