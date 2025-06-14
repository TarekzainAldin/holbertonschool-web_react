import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseListRow from './CourseListRow/CourseListRow';

describe('CourseListRow', () => {
  test('renders header row with one cell', () => {
    render(<CourseListRow isHeader={true} textFirstCell="Available courses" />);
    const cell = screen.getByText('Available courses');
    expect(cell).toBeInTheDocument();
  });

  test('renders header row with two cells', () => {
    render(<CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />);
    expect(screen.getByText('Course name')).toBeInTheDocument();
    expect(screen.getByText('Credit')).toBeInTheDocument();
  });

  test('renders normal row with checkbox', () => {
    const onChangeRow = jest.fn();
    render(<CourseListRow id={1} textFirstCell="ES6" textSecondCell="60" onChangeRow={onChangeRow} />);

    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChangeRow).toHaveBeenCalledWith(1, true);
  });
});
