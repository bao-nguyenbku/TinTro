import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalNavigation: null,
};

const slice = createSlice({
  name: 'globalNavigation',
  initialState,
  reducers: {
    setGlobalNavigation: (state, action) => {
      state.globalNavigation = action.payload.navigation;
    },
  },
});

const { setGlobalNavigation } = slice.actions;

export { setGlobalNavigation };

export default slice.reducer;
