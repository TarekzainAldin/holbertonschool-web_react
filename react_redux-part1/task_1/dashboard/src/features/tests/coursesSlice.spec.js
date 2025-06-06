import reducer, { fetchCourses } from './coursesSlice';
import { logout } from '../auth/authSlice';

// حالة ابتدائية لاختباراتنا
const initialState = {
  courses: [],
};

// بيانات وهمية للاختبار
const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
];

// 1. اختبار الحالة الابتدائية
test('should return the initial state by default', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

// 2. اختبار عند تنفيذ fetchCourses.fulfilled
test('should handle fetchCourses.fulfilled and populate courses', () => {
  const action = {
    type: fetchCourses.fulfilled.type,
    payload: mockCourses,
  };

  const state = reducer(initialState, action);

  expect(state.courses).toEqual(mockCourses);
});

// 3. اختبار عند تنفيذ logout
test('should reset state when logout action is dispatched', () => {
  const populatedState = {
    courses: mockCourses,
  };

  const stateAfterLogout = reducer(populatedState, logout());

  expect(stateAfterLogout).toEqual(initialState);
});
