import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { newContext } from "../Context/context";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Header component", () => {
  test("should not render logoutSection if user is not logged in", () => {
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
  });

  test("should render logoutSection if user is logged in", () => {
    render(
      <newContext.Provider
        value={{
          user: {
            isLoggedIn: true,
            email: "test@email.com",
            password: "12345678",
          },
          logOut: jest.fn(),
        }}
      >
        <Header />
      </newContext.Provider>
    );

    expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test("should call logOut when clicking logout link", () => {
    const mockLogOut = jest.fn();
    render(
      <newContext.Provider
        value={{
          user: {
            isLoggedIn: true,
            email: "test@email.com",
            password: "12345678",
          },
          logOut: mockLogOut,
        }}
      >
        <Header />
      </newContext.Provider>
    );
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogOut).toHaveBeenCalled();
  });
});
