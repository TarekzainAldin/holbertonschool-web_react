import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

describe("NotificationItem component", () => {
  test("renders with correct text and color for default type", () => {
    render(<NotificationItem id={1} type="default" value="Default notification" />);
    const li = screen.getByText("Default notification");
    expect(li).toBeInTheDocument();
    expect(li).toHaveStyle("color: blue");
  });

  test("renders with correct text and color for urgent type", () => {
    render(<NotificationItem id={2} type="urgent" value="Urgent notification" />);
    const li = screen.getByText("Urgent notification");
    expect(li).toBeInTheDocument();
    expect(li).toHaveStyle("color: red");
  });

  test("calls markAsRead on click", () => {
    const mockMarkAsRead = jest.fn();
    render(
      <NotificationItem id={3} type="default" value="Clickable notification" markAsRead={mockMarkAsRead} />
    );
    const li = screen.getByText("Clickable notification");
    fireEvent.click(li);
    expect(mockMarkAsRead).toHaveBeenCalledWith(3);
  });
});
