/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Login component', () => {
  test('renders 2 input elements', () => {
    const { container } = render(<Login />);
    const inputs = container.querySelectorAll(
      "input[type='email'], input[type='password']"
    );
    expect(inputs.length).toBe(2);
  });

  test('renders labels for email and password', () => {
    render(<Login />);
    const labels = screen.getAllByText(/email|password/i);
    expect(labels.length).toBe(2);
  });

  test('renders a submit button with the text OK', () => {
    render(<Login />);
    const submitBtn = screen.getByRole('button', { name: /^OK$/i });
    expect(submitBtn).toBeInTheDocument();
  });

  test('submit button is disabled by default', () => {
    render(<Login />);
    const submitBtn = screen.getByRole('button', { name: /^OK$/i });
    expect(submitBtn).toBeDisabled();
  });

  test('submit button becomes enabled with valid email and strong password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /^OK$/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitBtn).toBeEnabled();
  });

  test('submit button remains disabled with invalid email', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /^OK$/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitBtn).toBeDisabled();
  });

  test('submit button remains disabled with short password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /^OK$/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    expect(submitBtn).toBeDisabled();
  });

  test('calls logIn with email and password on form submit', () => {
    const logInMock = jest.fn();
    const { getByLabelText, getByText } = render(<Login logIn={logInMock} />);

    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/ok/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(logInMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
