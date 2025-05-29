// src/Login/Login.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('renders login form inputs and submit button', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  it('enables submit button when email and password are valid', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'validpass' },
    });
    expect(screen.getByRole('button', { name: /ok/i })).toBeEnabled();
  });

  it('calls logIn with email and password when submitted', () => {
    const mockLogIn = jest.fn();
    render(<Login logIn={mockLogIn} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'strongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(mockLogIn).toHaveBeenCalledWith('user@example.com', 'strongpass');
  });

  it('disables submit button if form is invalid', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'short' },
    });
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });
});
