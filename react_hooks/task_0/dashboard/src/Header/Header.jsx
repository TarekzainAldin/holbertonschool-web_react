import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';  // Correct default import here
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
      <newContext.Provider
        value={{
          user: { isLoggedIn: false, email: '', password: '' },
          logOut: jest.fn(),
        }}
      >
        <Header />
      </newContext.Provider>
    );
    expect(screen.queryByText(/logout/i)).toBeNull();
  });

  test('renders logoutSection with user email when logged in', () => {
    render(
      <newContext.Provider
        value={{
          user: { isLoggedIn: true, email: 'test@email.com', password: '12345678' },
          logOut: jest.fn(),
        }}
      >
        <Header />
      </newContext.Provider>
    );
    expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('calls logOut function when logout link is clicked', () => {
    const mockLogOut = jest.fn();
    render(
      <newContext.Provider
        value={{
          user: { isLoggedIn: true, email: 'test@email.com', password: '12345678' },
          logOut: mockLogOut,
        }}
      >
        <Header />
      </newContext.Provider>
    );

    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogOut).toHaveBeenCalled();
  });
});
