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
                (state, action) => {
                    state.loading = true;
                }
            ).addCase(getAllAccommodations.fulfilled,
                (state, action) => {  
                    console.log(action.payload);
                    const accommodationList = action.payload;
                    state.loading = false;
                    state.accommodations = accommodationList;
                }
            ).addCase(getAllAccommodations.rejected, 
                (state, action) => {
                    console.log('Rejected');
                    const error = action.payload;
                    state.loading = false;
                    state.error = error;
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
        return getAllAccommodationsService()
        .then(response => response.data)
        .catch(error => rejectWithValue(error.toJSON()))
    }
)
// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = accommodationSlice.actions

export default accommodationSlice.reducer