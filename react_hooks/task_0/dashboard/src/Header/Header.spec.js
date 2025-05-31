import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import newContext from '../Context/context'; // import it here
import Header from './Header';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Header component', () => {
  test('does NOT render logoutSection if user is NOT logged in', () => {
    render(
      <newContext.Provider value={{ user: { isLoggedIn: false, email: '' }, logOut: jest.fn() }}>
        <Header />
      </newContext.Provider>
    );
    expect(screen.queryByText(/logout/i)).toBeNull();
  });

  test('renders logoutSection with user email when logged in', () => {
    render(
      <newContext.Provider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: jest.fn() }}>
        <Header />
      </newContext.Provider>
    );
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('calls logOut function when logout link is clicked', () => {
    const mockLogOut = jest.fn();
    render(
      <newContext.Provider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: mockLogOut }}>
        <Header />
      </newContext.Provider>
    );
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogOut).toHaveBeenCalled();
  });
});
