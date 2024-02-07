import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice';

//Create your Redux store and integrate it with your React app.

export const store = configureStore({
  reducer : {
    auth: authSlice,
  },
});
