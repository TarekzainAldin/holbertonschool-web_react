import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { StyleSheetTestUtils } from "aphrodite";
import newContext from "../Context/context"; // Assure-toi que le chemin est correct

// Empêche l'injection des styles dans le DOM lors des tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("App component", () => {
  test("renders header, login and footer components", () => {
    render(<App />);
    expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });

  test("calls logOut and alerts when Ctrl + H is pressed", () => {
    const logOutMock = jest.fn();
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Mocke la méthode logOut directement sur le prototype de App
    const originalLogOut = App.prototype.logOut;
    App.prototype.logOut = logOutMock;

    render(<App />);

    fireEvent.keyDown(document, {
      key: "h",
      ctrlKey: true,
    });

    expect(alertMock).toHaveBeenCalledWith("Logging you out");
    expect(logOutMock).toHaveBeenCalledTimes(1);

    // Nettoyage
    App.prototype.logOut = originalLogOut;
    alertMock.mockRestore();
  });

  test('displays "Log in to continue" title when isLoggedIn is false', () => {
    render(
      <newContext.Provider
        value={{ user: { isLoggedIn: false }, logOut: jest.fn() }}
      >
        <App />
      </newContext.Provider>
    );
    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
  });

  test("displays News from the School and its paragraph", () => {
    render(<App />);
    expect(screen.getByText(/News from the School/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Holberton School News goes here/i)
    ).toBeInTheDocument();
  });
});
