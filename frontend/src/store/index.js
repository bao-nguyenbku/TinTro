import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './reducer/accommodation';
import userReducer from './reducer/user';

const store = configureStore({
  reducer: {
    user: userReducer,
    accommodation: accommodationReducer,
  },
});

export default store;
