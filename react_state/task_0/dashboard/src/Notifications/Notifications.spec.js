import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications", () => {
  const mockNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    {
      id: 3,
      type: "urgent",
      html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
    },
  ];

  // اختبار استدعاء الدالة عند الضغط على عنوان "Your notifications"
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

  // اختبار استدعاء الدالة عند الضغط على زر الإغلاق
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
});
