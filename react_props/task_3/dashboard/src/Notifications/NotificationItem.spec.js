// NotificationItem.spec.js
import { render, screen } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

describe("NotificationItem", () => {
  it("renders with default type and blue color", () => {
    render(<NotificationItem type="default" value="Test" />);
    const item = screen.getByText("Test");
    expect(item).toHaveAttribute("data-notification-type", "default");
    expect(item).toHaveStyle({ color: "blue" });
  });

  it("renders with urgent type and red color", () => {
    render(<NotificationItem type="urgent" value="Urgent Test" />);
    const item = screen.getByText("Urgent Test");
    expect(item).toHaveAttribute("data-notification-type", "urgent");
    expect(item).toHaveStyle({ color: "red" });
  });
});
