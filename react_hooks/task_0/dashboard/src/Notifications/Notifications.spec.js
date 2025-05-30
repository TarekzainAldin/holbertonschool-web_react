import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notifications', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const notiftitle = screen.getByText(/Here is the list of notifications/i);

    expect(notiftitle).toBeInTheDocument();
  })

  test('Check the existence of the button element in the notifications', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  })

  test('Verify that there are 3 li elements as notifications rendered', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    const lielements = screen.getAllByRole('listitem');

    expect(lielements.length).toBe(3);
  })
})

describe('Whenever the prop displayDrawer set to false', () => {
  test('Check that the Notifications component doesn t displays the elements', () => {
    const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ];
    render(<Notifications notifications={notifications} displayDrawer={false} />);

    expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  })
})

describe('Whenever the the prop displayDrawer set to true', () => {
  test('Check that the Notifications component displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    render(<Notifications notifications={notifications} displayDrawer={true} />);

    expect(screen.queryByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  test('Check that the Notifications component displays the elements', () => {
    const notifications = [];
    render(<Notifications notifications={notifications} displayDrawer={true} />);

    expect(screen.queryByText("No new notification for now")).toBeInTheDocument();
  });
})

test('logs to the console when a notification item is clicked', () => {
  const notifications = [
    { id: 1, type: 'default', value: 'New course available' },
  ];

  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const mockMarkAsRead = jest.fn((id) => console.log(`Notification ${id} has been marked as read`));

  render(
    <Notifications
      notifications={notifications}
      displayDrawer={true}
      markNotificationAsRead={mockMarkAsRead}
    />
  );

  const notificationItem = screen.getByText('New course available');
  fireEvent.click(notificationItem);

  expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  expect(consoleLogSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

  consoleLogSpy.mockRestore();
});


describe('Notifications component', () => {
  const spyRender = jest.spyOn(Notifications.prototype, 'render');
  beforeEach(() => {
    spyRender.mockClear();
  });
    const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test("re-renders if notifications content changes even if length is the same", () => {
    const initialNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ];

    const { rerender } = render(
      <Notifications notifications={initialNotifications} displayDrawer={true} />
    );

    expect(spyRender).toHaveBeenCalledTimes(1);

    const updatedNotifications = [
      { id: 1, type: 'default', value: 'Notification 1 updated' },
      { id: 2, type: 'urgent', value: 'Notification 2 updated' },
    ];

    rerender(
      <Notifications notifications={updatedNotifications} displayDrawer={true} />
    );

    // Re-render attendu car les objets sont nouveaux
    expect(spyRender).toHaveBeenCalledTimes(2);
  });

  test('re-renders when notifications length changes', () => {
    const initialNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
    ];

    const { rerender } = render(
      <Notifications notifications={initialNotifications} displayDrawer={true} />
    );

    expect(spyRender).toHaveBeenCalledTimes(1);

    const updatedNotifications = [
      ...initialNotifications,
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ];

    rerender(
      <Notifications notifications={updatedNotifications} displayDrawer={true} />
    );

    expect(spyRender).toHaveBeenCalledTimes(2);
  });
  test('calls handleDisplayDrawer when clicking on menu item', () => {
  const handleDisplayDrawer = jest.fn();

  render(
    <Notifications
      notifications={mockNotifications}
      displayDrawer={false}
      handleDisplayDrawer={handleDisplayDrawer}
      handleHideDrawer={() => {}}
    />
  );

  const menuItem = screen.getByText(/your notifications/i);
  fireEvent.click(menuItem);

  expect(handleDisplayDrawer).toHaveBeenCalled();
});

  test('calls handleHideDrawer when clicking the close button', () => {
    const handleHideDrawer = jest.fn();

    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        handleDisplayDrawer={() => {}}
        handleHideDrawer={handleHideDrawer}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleHideDrawer).toHaveBeenCalled();
  });
});
