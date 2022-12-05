import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAccommodationsService, searchAccommodationByKeywordService, requestRentRoomService } from 'services/accommodation';
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
        utilities: []
    }

}

export const accommodationSlice = createSlice({
    name: 'accommodation',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllAccommodations.pending,
                (state) => {
                    state.loading = true;
                }
            ).addCase(getAllAccommodations.fulfilled,
                (state, action) => {
                    const accommodationList = action.payload;
                    state.loading = false;
                    state.accommodations = accommodationList;
                }
            ).addCase(getAllAccommodations.rejected,
                (state, action) => {
                    const error = action.payload;
                    state.loading = false;
                    state.error = error;
                }
            ).addCase(searchAccommodationByKeyword.pending,
                (state) => {
                    state.loading = true;
                }
            ).addCase(searchAccommodationByKeyword.fulfilled,
                (state, action) => {
                    const searchAccommodationList = action.payload;
                    state.loading = false;
                    state.searchAccommodations = searchAccommodationList;
                }
            )
    }

})
export const selectAccommodationState = createSelector(
    [state => state.accommodation],
    (accommodationState => accommodationState)
)

export const getAllAccommodations = createAsyncThunk(
    'accommodation/getAllAccommodations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllAccommodationsService();
            return response.data;
        } catch (error) {
            return rejectWithValue({
                ...error
            })
        }
    }
)

export const searchAccommodationByKeyword = createAsyncThunk(
    'accommodation/searchAccommodationByKeyword',
    async (keyword, { rejectWithValue }) => {
        try {
            const response = await searchAccommodationByKeywordService(keyword);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                ...error
            })
        }
    }
)

export const requestRentRoom = createAsyncThunk(
    'accommodation/requestRentRoom',
    async (accommodation, { rejectWithValue, getState }) => {
        const renterEmail = getState()?.user?.currentUser?.email;
        try {
            const response = await requestRentRoomService({
                accommodationId: accommodation.id,
                email: renterEmail
            })
        } catch (error) {
            return rejectWithValue({
                ...error
            })
        }
    }
)
export default accommodationSlice.reducer