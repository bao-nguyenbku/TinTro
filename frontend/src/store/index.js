import { configureStore } from "@reduxjs/toolkit";
import accommodationReducer from './reducer/accommodation';

export const store = configureStore({
    reducer: {
        accommodation: accommodationReducer
    }
})

