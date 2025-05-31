import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { AppContext } from '../App/AppContext';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Header component', () => {
  test('does not render logoutSection when user is not logged in', () => {
    render(
      <AppContext.Provider
        value={{
          user: { isLoggedIn: false, email: '', password: '' },
          logOut: jest.fn(),
        }}
      >
        <Header />
      </AppContext.Provider>
    );

    expect(screen.queryByText(/logout/i)).toBeNull();
  });

  test('renders logoutSection when user is logged in', () => {
    render(
      <AppContext.Provider
        value={{
          user: { isLoggedIn: true, email: 'test@email.com' },
          logOut: jest.fn(),
        }}
      >
        <Header />
      </AppContext.Provider>
    );

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
  });

  test('calls logOut when clicking logout link', () => {
    const mockLogOut = jest.fn();
    render(
      <AppContext.Provider
        value={{
          user: { isLoggedIn: true, email: 'test@email.com' },
          logOut: mockLogOut,
        }}
      >
        <Header />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogOut).toHaveBeenCalled();
  });
});
