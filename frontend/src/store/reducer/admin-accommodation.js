import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms, getAllRenterByRoomIdService } from 'services/admin-accommodation';

const initialState = {
  rooms: {
    loading: false,
    data: []
  },
  renters: {
    loading: false,
    data: []
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
  },
});
export const selectAdminAccommodationState = createSelector([(state) => state.adminAccommodation], (adminAccommodation) => adminAccommodation);

export const getAllRoomByOwner = createAsyncThunk(
  'renting/requestCheckoutRoom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllRooms();
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
