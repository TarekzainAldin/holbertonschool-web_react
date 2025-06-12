import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Notifications from './Notifications';
import { showDrawer, hideDrawer, markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import { StyleSheetTestUtils } from 'aphrodite';

const mockStore = configureStore([]);

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notifications Component with Redux', () => {
  let store;

  const initialState = {
    notifications: {
      displayDrawer: false,
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
      ]
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test('renders "Your notifications" menu item', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
  });

  test('clicking "Your notifications" dispatches showDrawer action', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    fireEvent.click(screen.getByText('Your notifications'));
    expect(store.dispatch).toHaveBeenCalledWith(showDrawer());
  });

  test('does NOT show notifications list when displayDrawer is false', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  test('shows notifications list and items when displayDrawer is true', () => {
    store = mockStore({
      notifications: {
        displayDrawer: true,
        notifications: initialState.notifications.notifications,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('clicking close button dispatches hideDrawer action', () => {
    store = mockStore({
      notifications: {
        displayDrawer: true,
        notifications: initialState.notifications.notifications,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Close'));
    expect(store.dispatch).toHaveBeenCalledWith(hideDrawer());
  });

  test('clicking a notification dispatches markNotificationAsRead with correct id', () => {
    store = mockStore({
      notifications: {
        displayDrawer: true,
        notifications: initialState.notifications.notifications,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // Find the first notification item by text and click it
    fireEvent.click(screen.getByText('New course available'));
    expect(store.dispatch).toHaveBeenCalledWith(markNotificationAsRead(1));
  });

  test('displays "No new notifications for now" if notifications list is empty', () => {
    store = mockStore({
      notifications: {
        displayDrawer: true,
        notifications: [],
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/no new notifications for now/i)).toBeInTheDocument();
  });
});
