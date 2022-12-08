import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAccommodationsService, searchAccommodationByKeywordService, requestRentRoomService, getRequestByRenterService } from 'services/accommodation';
// import store from 'store';

const initialState = {
  accommodations: [],
  loading: false,
  error: undefined,
  searchAccommodations: [],
  accommodationDetails: {
    id: 0,
    name: '',
    addressNumber: '',
    addressStreet: '',
    addressDistrict: '',
    addressCity: '',
    area: 0.0,
    rooms: [],
    price: 0,
    owner: null,
    ownerId: 0,
    thumbnail: '',
    images: [],
    description: '',
    utilities: [],
  },
  rentRequest: {
    loading: false,
    isSuccess: false,
    error: undefined,
    data: {},
  },
};

export const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState,
  reducers: {
    resetError(state) {
      state.error = undefined;
      state.rentRequest.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccommodations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAccommodations.fulfilled, (state, action) => {
        const accommodationList = action.payload;
        state.loading = false;
        state.accommodations = accommodationList;
      })
      .addCase(getAllAccommodations.rejected, (state, action) => {
        const error = action.payload;
        state.loading = false;
        state.error = error;
      })
      .addCase(searchAccommodationByKeyword.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAccommodationByKeyword.fulfilled, (state, action) => {
        const searchAccommodationList = action.payload;
        state.loading = false;
        state.searchAccommodations = searchAccommodationList;
      })
      .addCase(requestRentRoom.pending, (state) => {
        state.rentRequest.loading = true;
      })
      .addCase(requestRentRoom.fulfilled, (state, action) => {
        state.rentRequest.loading = false;
        state.rentRequest.isSuccess = true;
        state.rentRequest.data = action.payload;
      })
      .addCase(requestRentRoom.rejected, (state, action) => {
        state.rentRequest.loading = false;
        state.rentRequest.isSuccess = false;
        state.rentRequest.error = action.payload;
      })
      .addCase(getRentRequestByRenter.pending, (state) => {
        state.rentRequest.loading = true;
      })
      .addCase(getRentRequestByRenter.fulfilled, (state, action) => {
        // TODO: Use A renter may request multiple accommodation but for now,
        // one renter can only request to an accommodation
        const rentRequest = Array.isArray(action.payload) ? action.payload[0] : action.payload;
        state.rentRequest.loading = false;
        state.rentRequest.data = rentRequest;
      });
  },
});
export const selectAccommodationState = createSelector([(state) => state.accommodation], (accommodationState) => accommodationState);

export const getAllAccommodations = createAsyncThunk('accommodation/getAllAccommodations', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllAccommodationsService();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const searchAccommodationByKeyword = createAsyncThunk('accommodation/searchAccommodationByKeyword', async (keyword, { rejectWithValue }) => {
  try {
    const response = await searchAccommodationByKeywordService(keyword);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const requestRentRoom = createAsyncThunk('accommodation/requestRentRoom', async (accommodation, { rejectWithValue, getState }) => {
  const renterEmail = getState()?.user?.currentUser?.email || 'test1@gmail.com';
  try {
    const response = await requestRentRoomService({
      accommodationId: accommodation.id,
      email: renterEmail,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const getRentRequestByRenter = createAsyncThunk('accommodation/getRentRequestByRenter', async (accommodationId, { rejectWithValue }) => {
  try {
    const response = await getRequestByRenterService({ accommodationId });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
export const { resetError } = accommodationSlice.actions;
export default accommodationSlice.reducer;
