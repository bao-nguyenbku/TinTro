import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './reducer/accommodation';
import userReducer from './reducer/user';
import messageReducer from './reducer/message';

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    accommodation: accommodationReducer,
  },
});

export default store;
