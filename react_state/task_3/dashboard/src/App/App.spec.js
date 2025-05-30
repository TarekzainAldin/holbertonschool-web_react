import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('App component', () => {
  render(<App />);
});

test('should reset state and show login when ctrl+h is pressed', () => {
  // mock alert
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<App />);

  // simulate login
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  // confirm login success
  expect(screen.getByText(/Course list/i)).toBeInTheDocument();

  // simulate ctrl+h logout
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

  // check logout happened
  expect(alertSpy).toHaveBeenCalledWith('Logging you out');
  expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();

  alertSpy.mockRestore();
});

test('displays "Log in to continue" title when isLoggedIn is false', () => {
  render(<App />);
  const text = screen.getByText(/Log in to continue/i);
  expect(text).toBeInTheDocument();
});

test('Check that a title "News from the School" and paragraph are displayed by default', () => {
  render(<App />);

  const heading = screen.getByRole('heading', { level: 2, name: /News from the School/i });
  const paragraph = screen.getByText(/Holberton School News goes here/i);

  expect(heading).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});

test('displays "Course list" title when user logs in', () => {
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  const title = screen.getByText(/Course list/i);
  expect(title).toBeInTheDocument();
});
