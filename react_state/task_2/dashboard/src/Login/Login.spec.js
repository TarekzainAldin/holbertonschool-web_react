import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('the text content within the 2 p elements in the app-body and app-footer divs matches', () => {
  render(<Login />);
  const divbody = screen.getByText(/Login to access the full dashboard/i);

  expect(divbody).toBeInTheDocument();
});

test('renders 2 input elements', () => {
  render(<Login />);
  const labelemail = screen.getByLabelText(/Email/i);
  const labelpassword = screen.getByLabelText(/Password/i);

  expect(labelemail).toBeInTheDocument();
  expect(labelpassword).toBeInTheDocument();
});

test('renders 2 label elements with the text Email and Password', () => {
  render(<Login />);
  const labelemail = screen.getByLabelText(/email/i);
  const labelpassword = screen.getByLabelText(/password/i);

  expect(labelemail).toBeInTheDocument();
  expect(labelpassword).toBeInTheDocument();
});

test('renders a button with the text OK', () => {
  render(<Login />);
  const button = screen.getByRole('button', { name: /ok/i });

  expect(button).toBeInTheDocument();
});

describe('Login Component', () => {
  test('Submit button is disabled by default', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test('Submit button enables only when email and password are valid', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    // Enter invalid email and valid password (8 chars)
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(submitButton).toBeDisabled();

    // Enter valid email but short password
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(submitButton).toBeDisabled();

    // Enter valid email and valid password (>=8 chars)
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(submitButton).toBeEnabled();
  });

  test('Submit button enables only when email and password are valid', () => {
    const mockMogIn = jest.fn();
    render(<Login logIn={mockMogIn} />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    expect(mockMogIn).toHaveBeenCalledWith('user@example.com', 'password123');
  });
});
