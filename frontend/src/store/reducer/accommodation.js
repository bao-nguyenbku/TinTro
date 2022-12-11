import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAccommodationsService, searchAccommodationByKeywordService, requestRentRoomService, getAllRequestByRenterService, getRecommendAccommodationsService, cancelRentRequestService } from 'services/accommodation';
// import store from 'store';
import { PRICE_ASCENDING, PRICE_DECENDING, REVIEW_ASCENDING, REVIEW_DECENDING } from 'constants';

const initialState = {
  accommodations: [],
  loading: false,
  error: undefined,
  searchAccommodations: [],
  recommendAccommodations: [],
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
    data: [],
  },
  cancelRequest: {
    loading: false,
    error: undefined
  }
};

export const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState,
  reducers: {
    resetError(state) {
      state.error = undefined;
      state.rentRequest.error = undefined;
    },
    filterByPrice(state, action) {
      const value = action.payload;
      switch (value) {
        case PRICE_ASCENDING: {
          state.searchAccommodations = [...state.searchAccommodations].sort((prev, curr) => prev.price - curr.price);
          break;
        }
        case PRICE_DECENDING: {
          state.searchAccommodations = [...state.searchAccommodations].sort((prev, curr) => curr.price - prev.price)
          break;
        }
        case REVIEW_ASCENDING: {
          state.searchAccommodations = [...state.searchAccommodations].sort((prev, curr) => prev.reviewStar - curr.reviewStar);
          break;
        }
        case REVIEW_DECENDING: {
          state.searchAccommodations = [...state.searchAccommodations].sort((prev, curr) => curr.reviewStar - prev.reviewStar);
          break;
        }

        default:
          break;
      }

    },
    resetRentRequest(state) {
      state.rentRequest = {
        loading: false,
        isSuccess: false,
        error: undefined,
        data: [],
      }
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
        const rentRequest = action.payload;
        state.rentRequest.loading = false;
        state.rentRequest.data = rentRequest;
      })
      .addCase(getRecommendAccommodations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendAccommodations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendAccommodations = action.payload;
      })
      .addCase(cancelRentRequest.pending, (state) => {
        state.cancelRequest.loading = true;
      })
      .addCase(cancelRentRequest.fulfilled, (state, _action) => {
        state.cancelRequest.loading = false;
      });
  },
});
export const selectAccommodationState = createSelector([(state) => state.accommodation], (accommodationState) => accommodationState);

export const getRecommendAccommodations = createAsyncThunk(
  'accommodation/getRecommendAccommodations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRecommendAccommodationsService();
      return response.data;
    } catch (error) {
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message
      })
    }
  }
)
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

export const requestRentRoom = createAsyncThunk('accommodation/requestRentRoom', async (accommodation, { rejectWithValue }) => {
  try {
    const response = await requestRentRoomService({
      accommodationId: accommodation.id,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const getRentRequestByRenter = createAsyncThunk('accommodation/getRentRequestByRenter', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllRequestByRenterService();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const cancelRentRequest = createAsyncThunk(
  'accommodation/cancelRentRequest',
  async (requestId, { rejectWithValue, dispatch }) => {
    try {
      const response = await cancelRentRequestService(requestId);
      dispatch(getRentRequestByRenter());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message,
      })
    }
  }
)
export const { resetError, filterByPrice, resetRentRequest } = accommodationSlice.actions;
export default accommodationSlice.reducer;
