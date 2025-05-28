// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

// 🧪 Mock aphrodite
jest.mock('aphrodite', () => ({
  StyleSheet: { create: () => ({}) },
  css: () => '',
}));

describe('Login component', () => {
  test('renders Login form with inputs and submit button', () => {
    render(<Login />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  test('enables submit when valid email and password are entered', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitButton).toBeEnabled();
  });

  test('calls logIn with correct data when form is submitted', () => {
    const mockLogin = jest.fn();
    render(<Login logIn={mockLogin} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'mypassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'mypassword');
  });
});
