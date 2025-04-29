import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders App and its children', () => {
    render(<App />);
    expect(screen.getByText(/School dashboard/i)).toBeInTheDocument(); // Header
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument(); // Login
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument(); // Login
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument(); // Footer
  });
});
