import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from "aphrodite";

// Disable Aphrodite style injection before all tests
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Re-enable Aphrodite style injection after all tests
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('li has attribute data-notification-type="default"', () => {
  render(<NotificationItem type="default" value="Test notification" />);
  const li = screen.getByText("Test notification");

  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute("data-notification-type", "default");
});

test('li has attribute data-notification-type="urgent"', () => {
  render(<NotificationItem type="urgent" value="Test urgent notification" />);
  const li = screen.getByText("Test urgent notification");

  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute("data-notification-type", "urgent");
});

test("calls markAsRead with correct id on click", () => {
  const mockMarkAsRead = jest.fn();
  render(
    <NotificationItem
      id={42}
      type="default"
      value="Clickable notification"
      markAsRead={mockMarkAsRead}
    />
  );

  const li = screen.getByText("Clickable notification");
  fireEvent.click(li);

  expect(mockMarkAsRead).toHaveBeenCalledWith(42);
});
