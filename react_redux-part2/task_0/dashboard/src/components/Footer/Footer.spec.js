
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as utils from "../../utils/utils";

// Mock utils functions
jest.mock("../../utils/utils");

describe("Footer component", () => {
  beforeEach(() => {
    utils.getCurrentYear.mockReturnValue(2025);
    utils.getFooterCopy.mockReturnValue("Holberton School");
  });

  const renderWithStore = (isLoggedIn) => {
    const store = configureStore({
      reducer: () => ({
        auth: { isLoggedIn }
      })
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
  };

  test("renders Footer when user is not logged in", () => {
    renderWithStore(false);

    expect(screen.getByText("Copyright 2025 - Holberton School")).toBeInTheDocument();
    expect(screen.queryByText("Contact us")).not.toBeInTheDocument();
  });

  test("renders Footer when user is logged in", () => {
    renderWithStore(true);

    expect(screen.getByText("Copyright 2025 - Holberton School")).toBeInTheDocument();
    expect(screen.getByText("Contact us")).toBeInTheDocument();
  });
});
