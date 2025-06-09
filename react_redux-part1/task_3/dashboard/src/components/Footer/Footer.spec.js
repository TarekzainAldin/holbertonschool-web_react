import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';

// Helper function to render with Redux
const renderWithRedux = (ui, { initialState, store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: { auth: initialState },
}) } = {}) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Footer component', () => {
  test('renders copyright text', () => {
    renderWithRedux(<Footer />, {
      initialState: {
        user: { email: '' },
        isLoggedIn: false,
      },
    });
    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
  });

  test('does not show Contact us when not logged in', () => {
    renderWithRedux(<Footer />, {
      initialState: {
        user: { email: '' },
        isLoggedIn: false,
      },
    });
    expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
  });

  test('shows Contact us when logged in', () => {
    renderWithRedux(<Footer />, {
      initialState: {
        user: { email: 'test@example.com' },
        isLoggedIn: true,
      },
    });
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
  });
});
