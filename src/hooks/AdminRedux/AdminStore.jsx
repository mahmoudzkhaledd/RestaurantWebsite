import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './AdminModelSlice';
export const store = configureStore({
    reducer: {
        admin: adminReducer,
    }
});


