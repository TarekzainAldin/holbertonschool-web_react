import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";
import { cleanup } from "@testing-library/react";

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

  // اختبار التأكد من استدعاء handleDisplayDrawer عند الضغط على عنوان الإشعارات
  test("Clicking on menu item calls handleDisplayDrawer", () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );
    const menuItem = screen.getByTestId("menu-item");
    fireEvent.click(menuItem);
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  // اختبار التأكد من استدعاء handleHideDrawer عند الضغط على زر الإغلاق
  test("Clicking on close button calls handleHideDrawer", () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  // (اختبارات إضافية حسب الحاجة...)
});

afterEach(() => {
  cleanup();
});
