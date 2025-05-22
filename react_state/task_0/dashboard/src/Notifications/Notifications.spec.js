// task_0/dashboard/src/Notifications/Notifications.spec.js
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

const mockNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  {
    id: 3,
    type: "urgent",
    html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
  },
];

describe("Notifications component", () => {
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

  test("Notifications panel is not displayed when displayDrawer is false", () => {
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={false}
      />
    );
    expect(screen.queryByTestId("notifications-panel")).not.toBeInTheDocument();
  });

  test("Notifications panel is displayed with notifications when displayDrawer is true", () => {
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
      />
    );
    expect(screen.getByTestId("notifications-panel")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
