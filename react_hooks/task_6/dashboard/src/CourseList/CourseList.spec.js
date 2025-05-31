/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('CourseList component', () => {
  test('renders 5 rows when given a list of courses', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    render(<CourseList courses={courses} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5);
  });

  test('renders 1 row when given an empty array', () => {
    render(<CourseList courses={[]} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1);
  });
});
