import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import Notifications from './Notifications';

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

const preloadedState = {
  notifications: {
    notifications: mockNotifications,
  },
};

const renderWithRedux = (
  component,
  { initialState, store = configureStore({ reducer: { notifications: notificationsReducer }, preloadedState: initialState }) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Notifications component', () => {
  test('renders "Your notifications" text', () => {
    renderWithRedux(<Notifications />, { initialState: preloadedState });
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('drawer should be hidden by default', () => {
    renderWithRedux(<Notifications />, { initialState: preloadedState });
    const drawer = screen.getByText(/Here is the list of notifications/i).parentElement;
    expect(drawer).toHaveClass('Notifications');
    expect(drawer).not.toHaveClass('visible');
  });

  test('clicking on "Your notifications" toggles drawer open', () => {
    renderWithRedux(<Notifications />, { initialState: preloadedState });
    const trigger = screen.getByText(/Your notifications/i);
    fireEvent.click(trigger);
    const drawer = screen.getByText(/Here is the list of notifications/i).parentElement;
    expect(drawer).toHaveClass('Notifications');
    expect(drawer).toHaveClass('visible');
  });

  test('clicking close button toggles drawer closed', () => {
    renderWithRedux(<Notifications />, { initialState: preloadedState });
    const trigger = screen.getByText(/Your notifications/i);
    fireEvent.click(trigger);
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);
    const drawer = screen.getByText(/Here is the list of notifications/i).parentElement;
    expect(drawer).not.toHaveClass('visible');
  });

  test('renders correct number of notifications', () => {
    renderWithRedux(<Notifications />, { initialState: preloadedState });
    const trigger = screen.getByText(/Your notifications/i);
    fireEvent.click(trigger);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockNotifications.length);
  });
});
