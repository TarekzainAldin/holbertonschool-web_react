import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Notifications from "./Notifications";

const mockStore = configureStore([]);

describe("Notifications component", () => {
  it("renders loading indicator when loading is true", () => {
    const store = mockStore({
      notifications: {
        notifications: [],
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders no notifications when list is empty", () => {
    const store = mockStore({
      notifications: {
        notifications: [],
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("renders notifications list when data is available", () => {
    const store = mockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
        ],
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
  });
});
