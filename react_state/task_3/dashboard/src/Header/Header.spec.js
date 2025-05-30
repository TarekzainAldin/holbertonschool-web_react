import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('h1 element with the text School Dashboard is rendered', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', { name: /School Dashboard/i });
  expect(heading).toBeInTheDocument();
});

test('an img element is rendered', () => {
  render(<Header />);
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});

test('logoutSection is not rendered when user is not logged', () => {
  render(<Header />);
  const logoutSection = screen.queryByText(/logout/i);
  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  const user = { email: 'user@example.com', password: 'password123', isLoggedIn: true };
  const logOut = jest.fn();

  render(
    <newContext.Provider value={{ user, logOut }}>
      <Header />
    </newContext.Provider>
  );

  expect(screen.getByText(/Welcome user@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  const user = { email: 'user@example.com', password: 'password123', isLoggedIn: true };
  const logOut = jest.fn();

  render(
    <newContext.Provider value={{ user, logOut }}>
      <Header />
    </newContext.Provider>
  );
  const logOutLink = screen.getByText(/logout/i);
  fireEvent.click(logOutLink);

  expect(logOut).toHaveBeenCalled();
});
