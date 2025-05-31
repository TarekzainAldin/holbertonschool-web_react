/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notifications component', () => {
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  test("Always renders 'Your notifications' title", () => {
    render(<Notifications />);
    const title = screen.getByText(/your notifications/i);
    expect(title).toBeInTheDocument();
  });

  test('Does not display notifications list when displayDrawer is false', () => {
    render(
      <Notifications displayDrawer={false} notifications={notificationsList} />
    );

    expect(
      screen.queryByText(/here is the list of notifications/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /close/i })
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });

  test('Displays notifications list when displayDrawer is true', () => {
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />
    );

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(3);
  });

  test("Displays 'No new notification for now' if notifications is empty", () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);

    expect(
      screen.getByText(/no new notification for now/i)
    ).toBeInTheDocument();
  });

  /*test("Clicking the close button logs to console", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />
    );

    const button = screen.getByRole("button", { name: /close/i });
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore(); // cleanup
  });*/

  test('calls handleHideDrawer when close button is clicked', () => {
    const handleHideDrawer = jest.fn();

    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        handleHideDrawer={handleHideDrawer}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleHideDrawer).toHaveBeenCalled();
  });

  test('logs correct message when a notification is clicked', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
    ];

    const markNotificationAsRead = (id) =>
      console.log(`Notification ${id} has been marked as read`);

    render(
      <Notifications
        displayDrawer={true}
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );

    const listItem = screen.getByText(/new course available/i);
    fireEvent.click(listItem);

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    logSpy.mockRestore();
  });

  test('does not re-render if notifications length stays the same', () => {
    const initialList = [
      { id: 1, type: 'default', value: 'New course available' },
    ];

    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={initialList} />
    );

    const oldItem = screen.getByText(/new course available/i);
    rerender(
      <Notifications displayDrawer={true} notifications={[...initialList]} />
    );

    expect(screen.getByText(/new course available/i)).toBe(oldItem);
  });

  test('re-renders if notifications length changes', () => {
    const initialList = [
      { id: 1, type: 'default', value: 'New course available' },
    ];

    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={initialList} />
    );

    const newList = [
      ...initialList,
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    rerender(<Notifications displayDrawer={true} notifications={newList} />);

    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
  });

  test('calls handleDisplayDrawer when clicking on menu item', () => {
    const handleDisplayDrawer = jest.fn();

    render(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    const menuItem = screen.getByText(/your notifications/i);
    fireEvent.click(menuItem);

    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test('calls handleHideDrawer when clicking on close button', () => {
    const handleHideDrawer = jest.fn();

    render(
      <Notifications
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
        notifications={notificationsList}
      />
    );
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    expect(handleHideDrawer).toHaveBeenCalled();
  });

  test('calls markNotificationAsRead on click', () => {
    const mockRead = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        notifications={[{ id: 1, type: 'default', value: 'Test' }]}
        markNotificationAsRead={mockRead}
      />
    );
    fireEvent.click(screen.getByText(/Test/i));
    expect(mockRead).toHaveBeenCalledWith(1);
  });
});
