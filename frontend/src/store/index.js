import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user';
import messageReducer from './reducer/message';

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});

export default store;
