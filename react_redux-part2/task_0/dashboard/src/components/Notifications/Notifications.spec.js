import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Notifications from "./Notifications";

const mockStore = configureStore([]);

describe("Notifications component", () => {
  it("displays loading indicator (Loading...) before data fetching", () => {
    const store = mockStore({
      notifications: {
        notifications: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays notifications after loading is false", () => {
    const store = mockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", html: { __html: "<strong>Urgent notification</strong>" } },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("Urgent notification")).toBeInTheDocument();
  });
});
