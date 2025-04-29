import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('includes 2 labels, 2 inputs, and 1 button', () => {
    render(<Login />);
    expect(screen.getAllByRole('textbox')).toHaveLength(1); // email input
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('focuses input when label is clicked', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const emailLabel = screen.getByText(/email/i);
    fireEvent.click(emailLabel);
    expect(emailInput).toHaveFocus();
  });
});
