import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils";

describe("Notifications component", () => {
  const mockNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    {
      id: 3,
      type: "urgent",
      html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
    },
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("Clicking on menu item calls handleDisplayDrawer", () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );
    fireEvent.click(screen.getByTestId("menu-item"));
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test("Clicking on close button calls handleHideDrawer", () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  test("Renders notification panel title when displayDrawer is true", () => {
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    expect(
      screen.getByText(/Here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test("Renders button element in the panel", () => {
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Renders 3 list items when 3 notifications are passed", () => {
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  test("Calls markAsRead with correct id when notification is clicked", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    fireEvent.click(screen.getAllByRole("listitem")[1]); // Click second item
    expect(consoleSpy).toHaveBeenCalledWith("Notification 2 has been marked as read");
    consoleSpy.mockRestore();
  });
});

describe("Notifications displayDrawer behavior", () => {
  const notifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  test("Does not show notification panel when displayDrawer is false", () => {
    render(<Notifications notifications={notifications} displayDrawer={false} />);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("Shows notification panel when displayDrawer is true", () => {
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Shows message when notifications list is empty", () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(screen.getByText("No new notification for now")).toBeInTheDocument();
  });
});

describe("Notifications performance optimizations", () => {
  test("Does not re-render if notifications length is unchanged", () => {
    const notifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];

    const { rerender } = render(
      <Notifications notifications={notifications} displayDrawer={true} />
    );

    const before = screen.getAllByRole("listitem");

    const updated = [
      { id: 1, type: "default", value: "Updated content" },
      { id: 2, type: "urgent", value: "Updated content" },
    ];

    rerender(<Notifications notifications={updated} displayDrawer={true} />);
    const after = screen.getAllByRole("listitem");

    expect(after.length).toBe(before.length);
  });

  test("Re-renders when notifications list length changes", () => {
    const initial = [
      { id: 1, type: "default", value: "New course available" },
    ];

    const { rerender } = render(
      <Notifications notifications={initial} displayDrawer={true} />
    );
    expect(screen.getAllByRole("listitem").length).toBe(1);

    const updated = [
      ...initial,
      { id: 2, type: "urgent", value: "New resume available" },
    ];
    rerender(<Notifications notifications={updated} displayDrawer={true} />);
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });
});
