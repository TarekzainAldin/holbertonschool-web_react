// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// ✅ Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  // Optional: enable devTools only in development mode
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
