import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllAccommodationsService,
  searchAccommodationByKeywordService,
  requestRentRoomService,
  getAllRequestByRenterService,
  getRecommendAccommodationsService,
  cancelRentRequestService,
} from 'services/accommodation';
// import store from 'store';
import { PRICE_ASCENDING, PRICE_DECENDING, REVIEW_ASCENDING, REVIEW_DECENDING } from 'constants';
import request from 'utils/axios';

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
    error: undefined,
  },
  adminRentRequests: [],
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
          state.searchAccommodations = [...state.searchAccommodations].sort((prev, curr) => curr.price - prev.price);
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
      };
    },
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
      })
      // --------------------- ADMIN FETCH MY ÂCCOMMODATION ---------------------
      .addCase(fetchAccomodationByOwnerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccomodationByOwnerId.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodationDetails = action.payload;
      })
      .addCase(fetchAccomodationByOwnerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ---------------------- ADD NEW ROOM --------------------------------
      .addCase(createNewRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewRoom.fulfilled, (state, _action) => {
        state.loading = false;
      })
      .addCase(createNewRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // --------------------------- EDIT ROOM ------------------------------
      .addCase(editRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(editRoom.fulfilled, (state, _action) => {
        state.loading = false;
      })
      .addCase(editRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // --------------------------- DELETE ROOM --------------------
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, _action) => {
        state.loading = false;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // --------------------------- GET RENT REQUESTS ADMIN  --------------------
      .addCase(getRentRequestsAdmin.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getRentRequestsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminRentRequests = action.payload;
      })
      .addCase(getRentRequestsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const getRecommendAccommodations = createAsyncThunk('accommodation/getRecommendAccommodations', async (_, { rejectWithValue }) => {
  try {
    const response = await getRecommendAccommodationsService();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});
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

export const cancelRentRequest = createAsyncThunk('accommodation/cancelRentRequest', async (requestId, { rejectWithValue, dispatch }) => {
  try {
    const response = await cancelRentRequestService(requestId);
    dispatch(getRentRequestByRenter());
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});

export const fetchAccomodationByOwnerId = createAsyncThunk('accommodation/fetchMyAccommodation', async (_, { rejectWithValue }) => {
  try {
    // FIXME: Change endpoints
    const response = await request.get(`/admin-accommodation/my-accommodation`);
    return response.data;
  } catch (e) {
    if (e.response) {
      return rejectWithValue({
        statusCode: e.response.status,
        message: e.response.message,
      });
    }
    return rejectWithValue({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});

export const createNewRoom = createAsyncThunk('accommodation/createNewRoom', async ({ values, done }, { rejectWithValue }) => {
  try {
    const response = await request.post('/admin-accommodation/room', values);
    if (done) done();
    return response.data;
  } catch (error) {
    if (error.response)
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message,
      });
    return rejectWithValue({
      statusCode: 500,
      message: error.message,
    });
  }
});

export const editRoom = createAsyncThunk('accommodation/editRoom', async ({ values, roomId, done }, { rejectWithValue }) => {
  try {
    const response = await request.put(`/admin-accommodation/room/${roomId}`, values);
    if (done) done();
    return response.data;
  } catch (error) {
    if (error.response)
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message,
      });
    return rejectWithValue({
      statusCode: 500,
      message: error.message,
    });
  }
});

export const deleteRoom = createAsyncThunk('accommodation/deleteRoom', async ({ roomId, done }, { rejectWithValue }) => {
  try {
    const response = await request.delete(`/admin-accommodation/room/${roomId}`);
    if (done) done();
    return response.data;
  } catch (error) {
    if (error.response)
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message,
      });
    return rejectWithValue({
      statusCode: 500,
      message: error.message,
    });
  }
});

export const getRentRequestsAdmin = createAsyncThunk('accommodation/adminGetRentRequests', async (_, { rejectWithValue }) => {
  try {
    const response = await request.get('/admin-accommodation/rent-requests/all');
    return response.data;
  } catch (error) {
    if (error.response)
      return rejectWithValue({
        statusCode: error.response.status,
        message: error.response.message,
      });
    return rejectWithValue({
      statusCode: 500,
      message: error.message,
    });
  }
});

export const selectAccommodationState = createSelector([(state) => state.accommodation], (accommodationState) => accommodationState);
export const { resetError, filterByPrice, resetRentRequest } = accommodationSlice.actions;
export default accommodationSlice.reducer;
