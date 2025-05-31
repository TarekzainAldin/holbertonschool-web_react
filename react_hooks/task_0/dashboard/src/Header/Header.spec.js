// src/Header/Header.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

// Utility to render with custom context
const renderWithContext = (ui, { providerProps }) => {
  return render(
    <newContext.Provider value={providerProps}>
      {ui}
    </newContext.Provider>
  );
};

describe('Header Component', () => {
  it('renders without crashing', () => {
    renderWithContext(<Header />, { providerProps: { user: { isLoggedIn: false }, logOut: jest.fn() } });
    expect(screen.getByText('School dashboard')).toBeInTheDocument();
    expect(screen.queryByText(/Welcome/)).toBeNull();
  });

  it('displays welcome message when user is logged in', () => {
    const providerProps = {
      user: {
        isLoggedIn: true,
        email: 'test@example.com'
      },
      logOut: jest.fn(),
    };

    renderWithContext(<Header />, { providerProps });

    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
    expect(screen.getByText('(logout)')).toBeInTheDocument();
  });

  it('calls logOut function when logout link is clicked', () => {
    const mockLogOut = jest.fn();
    const providerProps = {
      user: {
        isLoggedIn: true,
        email: 'test@example.com'
      },
      logOut: mockLogOut,
    };

    renderWithContext(<Header />, { providerProps });

    fireEvent.click(screen.getByText('(logout)'));
    expect(mockLogOut).toHaveBeenCalled();
  });
});
