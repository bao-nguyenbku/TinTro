import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './reducer/accommodation';
import userReducer from './reducer/user';
import messageReducer from './reducer/message';
import rentingReducer from './reducer/renting';
import adminAccommodationReducer from './reducer/admin-accommodation';
import parkingReducer from './reducer/parking';
import wifiReducer from './reducer/wifi';
import reviewReducer from './reducer/review';

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        accommodation: accommodationReducer,
        renting: rentingReducer,
        adminAccommodation: adminAccommodationReducer,
        parking: parkingReducer,
        wifi: wifiReducer,
        review: reviewReducer
    },
});

export default store;