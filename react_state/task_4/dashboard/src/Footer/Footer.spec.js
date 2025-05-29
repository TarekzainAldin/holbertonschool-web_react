import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import AppContext from '../App/AppContext';

describe('Footer component with context', () => {
  test('does not display "Contact us" when user is logged out', () => {
    const contextValue = { user: { isLoggedIn: false } };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );

    expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
  });

  test('displays "Contact us" when user is logged in', () => {
    const contextValue = { user: { isLoggedIn: true } };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );

    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
  });
});
