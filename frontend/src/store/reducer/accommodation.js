import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAccommodationsService } from 'services/accommodation';

const initialState = {
  accommodations: [],
  loading: false,
  error: undefined,
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
};

export const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState,
  reducers: {},
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
      });
  },
});
export const selectAccommodationState = createSelector([(state) => state.accommodation], (accommodationState) => accommodationState);

export const getAllAccommodations = createAsyncThunk('accommodation/getAllAccommodations', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllAccommodationsService();
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue({
      error: error.message,
      statusCode: error.status,
    });
  }
});

export default accommodationSlice.reducer;
