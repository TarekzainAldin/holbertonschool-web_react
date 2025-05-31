import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Notifications from "../Notifications/Notifications";
import { getLatestNotification } from "../utils/utils";
import { StyleSheetTestUtils } from "aphrodite";
import { newContext } from "../Context/context";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("App component", () => {
  const notificationsList = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  test("renders Header component", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /school dashboard/i })
    ).toBeInTheDocument();
  });

  test("renders Login component", () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(<App />);
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
  });

  test("renders Notifications component", () => {
    render(<App />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("displays 'Log in to continue' title before login", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: /log in to continue/i })
    ).toBeInTheDocument();
  });

  test("displays CourseList after valid login", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^OK$/i }));

    expect(
      screen.getByRole("columnheader", { name: /available courses/i })
    ).toBeInTheDocument();
  });

  test("calls logOut when Ctrl+H is pressed", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^OK$/i }));
    fireEvent.keyDown(document, { key: "h", ctrlKey: true });

    expect(alertMock).toHaveBeenCalledWith("Logging you out");
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    alertMock.mockRestore();
  });

  test("displays alert with 'Logging you out' when Ctrl+H is pressed", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<App />);
    fireEvent.keyDown(document, { key: "h", ctrlKey: true });
    expect(alertMock).toHaveBeenCalledWith("Logging you out");
    alertMock.mockRestore();
  });

  test("displays news section with title and paragraph", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: /news from the school/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/holberton school news goes here/i)
    ).toBeInTheDocument();
  });

  test("calls handleDisplayDrawer when menu item is clicked", () => {
    const handleDisplayDrawer = jest.fn();
    render(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    const menuItem = screen.getByText(/your notifications/i);
    fireEvent.click(menuItem);
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test("calls handleHideDrawer when close button is clicked", () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
        notifications={notificationsList}
      />
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  test("markNotificationAsRead removes notification and logs correctly", () => {
    const logSpy = jest.spyOn(console, "log");

    render(
      <newContext.Provider
        value={{
          user: {
            isLoggedIn: true,
            email: "test@example.com",
            password: "12345678",
          },
          logOut: () => {},
        }}
      >
        <App />
      </newContext.Provider>
    );
    fireEvent.click(screen.getByText(/Your notifications/i));

    const notifText = screen.getByText(/New course available/i);
    fireEvent.click(notifText);

    expect(logSpy).toHaveBeenCalledWith(
      "Notification 1 has been marked as read"
    );
    expect(screen.queryByText(/New course available/i)).not.toBeInTheDocument();

    logSpy.mockRestore();
  });
});
