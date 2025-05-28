/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders login form when not logged in', () => {
    render(<App />);
    // Check if login title is rendered
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
    // Check if email input is rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Check if password input is rendered
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders course list when logged in', () => {
    render(<App />);

    // Log in by filling the form and submitting
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // Now the course list should be rendered
    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('logs out when ctrl+h is pressed and alert is shown', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App />);

    // Log in first
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));

    // Press ctrl+h to trigger logout
    fireEvent.keyDown(document, { ctrlKey: true, key: 'h' });

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    // After logout, login form should appear again
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();

    window.alert.mockRestore();
  });
});
