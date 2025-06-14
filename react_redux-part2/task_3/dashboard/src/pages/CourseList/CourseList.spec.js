import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseList from './CourseList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer, { fetchCourses } from '../../features/courses/coursesSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: {
      courses: coursesReducer,
    },
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('CourseList', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(ENDPOINTS.courses).reply(200, { courses: mockCourses });
  });

  afterEach(() => {
    mock.restore();
  });

  test('renders courses after fetching', async () => {
    const { store } = renderWithRedux(<CourseList />);
    await store.dispatch(fetchCourses());
    expect(await screen.findByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('checkboxes toggle selection', async () => {
    const { store } = renderWithRedux(<CourseList />);
    await store.dispatch(fetchCourses());

    const checkboxes = await screen.findAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const state = store.getState().courses.courses;
    expect(state[0].isSelected).toBe(true);
  });
});
