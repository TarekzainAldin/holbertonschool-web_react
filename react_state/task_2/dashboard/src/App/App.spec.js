// task_2/dashboard/src/App/App.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Login when not logged in', () => {
    render(<App />);
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList when logged in', () => {
    render(<App />);
    // log in by calling logIn via state update
    const email = 'test@example.com';
    const password = 'password123';

    // simulate login by finding Login form elements and triggering submit
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const submitButton = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    // Now CourseList should be rendered
    expect(screen.queryByText(/Login to access the full dashboard/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
  });

  test('logOut resets user state', () => {
    render(<App />);
    // Login first
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const submitButton = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // User logged in, now log out
    // Access logOut via context or simulate ctrl+h keypress?

    // Simulate Ctrl+H for logout alert and reset
    window.alert = jest.fn();
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    // Login form should re-appear after logout
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });
});
