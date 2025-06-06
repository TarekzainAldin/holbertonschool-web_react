// استدعاء الأدوات
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {logout} from '../auth/authSlice';


const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

// الحالة الابتدائية
const initialState = {
  courses: [],
};

// Thunk لجلب الكورسات
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(ENDPOINTS.courses);
      const data = await response.json();
      return data.courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// إنشاء Slice الخاص بالكورسات
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export default coursesSlice.reducer;