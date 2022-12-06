import { configureStore } from "@reduxjs/toolkit";
import accommodationReducer from './reducer/accommodation';
import userReducer from './reducer/user';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;