import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import newContext from "../Context/context";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Header component", () => {
  test("does NOT render logoutSection if user is NOT logged in", () => {
    render(
      <newContext.Provider
        value={{
          user: { isLoggedIn: false, email: "", password: "" },
          logOut: jest.fn(),
        }}
      >
        <Header />
      </newContext.Provider>
    );

    expect(screen.queryByText(/logout/i)).toBeNull();
    expect(screen.queryByText(/welcome/i)).toBeNull();
  });

  test("renders logoutSection with user email when logged in", () => {
    render(
      <newContext.Provider
        value={{
          user: { isLoggedIn: true, email: "user@example.com", password: "pass" },
          logOut: jest.fn(),
        }}
      >
        <Header />
      </newContext.Provider>
    );

    expect(screen.getByText(/welcome user@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test("calls logOut function when logout link is clicked", () => {
    const mockLogOut = jest.fn();

    render(
      <newContext.Provider
        value={{
          user: { isLoggedIn: true, email: "user@example.com", password: "pass" },
          logOut: mockLogOut,
        }}
      >
        <Header />
      </newContext.Provider>
    );

    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
