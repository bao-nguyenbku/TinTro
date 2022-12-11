import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './reducer/accommodation';
import userReducer from './reducer/user';
import messageReducer from './reducer/message';
import rentingReducer from './reducer/renting';
import adminAccommodationReducer from './reducer/admin-accommodation';

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        accommodation: accommodationReducer,
        renting: rentingReducer,
        adminAccommodation: adminAccommodationReducer
    },
});

export default store;