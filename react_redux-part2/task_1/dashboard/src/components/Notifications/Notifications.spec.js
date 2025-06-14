import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Notifications from './Notifications';


jest.mock('../../redux/notificationsSlice', () => ({
  fetchNotifications: jest.fn(() => ({ type: 'notifications/fetchNotifications' })),
}));

const mockStore = configureStore([thunk]);

describe('Notifications component', () => {
  it('renders loading state', () => {
    const store = mockStore({
      notifications: { notifications: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders notifications list', () => {
    const notificationsData = [{ id: 1, value: 'Test notification' }];
    const store = mockStore({
      notifications: { notifications: notificationsData, loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/Test notification/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    const store = mockStore({
      notifications: { notifications: [], loading: false, error: 'Failed to fetch' },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/Error fetching notifications/i)).toBeInTheDocument();
  });
});
