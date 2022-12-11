import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './reducer/accommodation';
import userReducer from './reducer/user';
import messageReducer from './reducer/message';
<<<<<<< HEAD
=======
import rentingReducer from './reducer/renting';
>>>>>>> remotes/origin/ntb/checkout-when-renting

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    accommodation: accommodationReducer,
<<<<<<< HEAD
=======
    renting: rentingReducer
>>>>>>> remotes/origin/ntb/checkout-when-renting
  },
});

export default store;
