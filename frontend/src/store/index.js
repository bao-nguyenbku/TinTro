import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './reducer/accommodation';
import userReducer from './reducer/user';
import systemReducer from './reducer/system';

export const store = configureStore({
  reducer: {
    user: userReducer,
    accommodation: accommodationReducer,
    system: systemReducer,
  },
});

export default store;
