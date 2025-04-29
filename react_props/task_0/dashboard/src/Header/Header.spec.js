import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header with logo and title', () => {
  render(<Header />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
});
