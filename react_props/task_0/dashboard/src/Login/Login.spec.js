import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login form with email and password inputs', () => {
  render(<Login />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});
