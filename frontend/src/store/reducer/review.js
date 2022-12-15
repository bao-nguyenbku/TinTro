import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reviewByRenterService } from 'services/review';

const initialState = {
  loading: false,
};

export const reviewSlice = createSlice({
  name: 'review',
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
  extraReducers: builder => {
    builder
      .addCase(reviewByRenter.pending, (state) => {
        state.loading = true;
      })
      .addCase(reviewByRenter.fulfilled, (state) => {
        state.loading = false;
      })
  }
});
export const selectReviewState = createSelector([(state) => state.review], (review) => review);

export const reviewByRenter = createAsyncThunk('renting/reviewByRenter', async ({ points, showToast }, { rejectWithValue, getState }) => {
  const accommodationId = getState().renting?.roomInfo?.data?.accommodationId;
  
  try {
    const response = await reviewByRenterService({ accommodationId, points });
    showToast();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      statusCode: error.response.status,
      message: error.response.message,
    });
  }
});


export const { reset } = reviewSlice.actions;
export default reviewSlice.reducer;
