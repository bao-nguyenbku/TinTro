import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
    text: 'TinTro'
}

export const userSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {}
})
export const selectExampleState = createSelector(
    [state => state.user],
    (userState => userState)
)

// Action creators are generated for each case reducer function
// export const { reducerMethod } = userSlice.actions

export default userSlice.reducer