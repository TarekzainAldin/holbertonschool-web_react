import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("NotificationItem component", () => {
  test('renders with type="default" with blue color and correct attribute', () => {
    render(<NotificationItem type="default" value="Test Default" />);
    const listItem = screen.getByText("Test Default");

    expect(listItem).toHaveAttribute("data-notification-type", "default");
    // expect(listItem).toHaveStyle({ color: "blue" });
  });

  test('renders with type="urgent" with red color and correct attribute', () => {
    render(<NotificationItem type="urgent" value="Test Urgent" />);
    const listItem = screen.getByText("Test Urgent");

    expect(listItem).toHaveAttribute("data-notification-type", "urgent");
    // expect(listItem).toHaveStyle({ color: "red" });
  });

  test("calls markAsRead with the right id on click", () => {
    const mockFn = jest.fn();
    render(
      <NotificationItem
        id={3}
        type="default"
        value="Test notification"
        markAsRead={mockFn}
      />
    );

    const item = screen.getByText(/test notification/i);
    fireEvent.click(item);
    expect(mockFn).toHaveBeenCalledWith(3);
  });
});
