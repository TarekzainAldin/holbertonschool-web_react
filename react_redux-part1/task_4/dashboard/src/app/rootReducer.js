// src/app/rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import coursesReducer from '../features/courses/coursesSlice';

// 🔗 Combine all slice reducers into one root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  courses: coursesReducer,
});

export default rootReducer;
