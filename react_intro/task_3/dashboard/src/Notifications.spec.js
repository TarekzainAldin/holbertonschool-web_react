import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications component", () => {
  test("renders the notifications title", () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the close button", () => {
    render(<Notifications />);
    const buttonElement = screen.getByRole("button", { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders 3 list items", () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  test("clicking the close button logs to the console", () => {
    console.log = jest.fn(); // Mock console.log
    render(<Notifications />);
    const button = screen.getByRole("button", { name: /close/i });
    fireEvent.click(button);
    expect(console.log).toHaveBeenCalledWith("Close button has been clicked");
  });
});
