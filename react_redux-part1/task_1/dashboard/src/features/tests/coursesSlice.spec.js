import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API_BASE_URL = "http://localhost:5173";
const COURSES_ENDPOINT = `${API_BASE_URL}/courses.json`;

// إعداد mock للـ Axios
const mock = new MockAdapter(axios);

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

  it('should return the initial state by default', () => {
    const result = coursesReducer(undefined, { type: undefined });
    expect(result).toEqual(initialState);
  });

  it('should fetch courses correctly and update the state', async () => {
    const mockCourses = [
      { id: 1, name: 'React Basics' },
      { id: 2, name: 'Redux Fundamentals' },
    ];

    mock.onGet(COURSES_ENDPOINT).reply(200, { courses: mockCourses });

    const store = configureStore({
      reducer: {
        courses: coursesReducer,
      },
      middleware: [thunk],
    });

    await store.dispatch(fetchCourses());

    const state = store.getState().courses;
    expect(state.courses).toEqual(mockCourses);
  });

  it('should reset courses to initial state when logout is dispatched', () => {
    const prevState = {
      courses: [{ id: 1, name: 'Dummy Course' }],
    };

    const newState = coursesReducer(prevState, logout());

    expect(newState).toEqual(initialState);
  });
});
