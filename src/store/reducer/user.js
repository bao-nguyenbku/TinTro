import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
    userName: 'TinTro'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})
export const selectUserState = createSelector(
    [state => state.user],
    (userState => userState)
)

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer