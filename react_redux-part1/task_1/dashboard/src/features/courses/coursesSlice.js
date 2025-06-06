// coursesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

// 1. الحالة الابتدائية
const initialState = {
  courses: [],
};

// 2. رابط الـ API
const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`
};

// 3. Thunk غير متزامن لجلب الكورسات
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(ENDPOINTS.courses);
      const data = await response.json();
      return data.courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 4. إنشاء slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {}, // لا نحتاج لمخفضات محلية
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(logout, () => {
        return initialState;
      });
  }
});

// 5. التصدير
export default coursesSlice.reducer;
