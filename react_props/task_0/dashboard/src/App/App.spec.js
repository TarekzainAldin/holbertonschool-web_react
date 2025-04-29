import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App and its children', () => {
  render(<App />);

  // تحقق من وجود النصوص أو العناصر المميزة لكل مكون
  expect(screen.getByText(/School dashboard/i)).toBeInTheDocument(); // Header
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument(); // Login
  expect(screen.getByText(/Copyright/i)).toBeInTheDocument(); // Footer
});
