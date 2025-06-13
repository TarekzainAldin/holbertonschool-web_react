import { configureStore } from '@reduxjs/toolkit';
import coursesReducer, { fetchCourses } from './coursesSlice';
import { logout } from '../auth/authSlice';

// Mock API response
const mockCourses = [
  { id: 1, title: 'React Basics' },
  { id: 2, title: 'Advanced Redux' },
];

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockCourses),
  })
);

describe('coursesSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        courses: coursesReducer,
      },
    });
    fetch.mockClear();
  });

  test('should return the initial state', () => {
    const state = store.getState().courses;
    expect(state).toEqual({ courses: [] });
  });

  test('should fetch and store courses data', async () => {
    await store.dispatch(fetchCourses());

    const state = store.getState().courses;
    expect(state.courses).toEqual(mockCourses);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/courses.json');
  });

  test('should reset courses state on logout', async () => {
    // First fetch courses
    await store.dispatch(fetchCourses());

    // Confirm data is loaded
    expect(store.getState().courses.courses).toEqual(mockCourses);

    // Dispatch logout
    store.dispatch(logout());

    // Expect state reset
    expect(store.getState().courses).toEqual({ courses: [] });
  });
});
