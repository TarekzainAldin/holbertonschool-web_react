import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Notifications from "../Notifications";
import * as notificationsSlice from "../../features/notifications/notificationsSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Notifications component", () => {
  let store;

  beforeEach(() => {
    // Spy on fetchNotifications thunk so it does nothing (or you can mock implementation)
    jest.spyOn(notificationsSlice, "fetchNotifications").mockImplementation(() => ({
      type: "notifications/fetchNotifications/pending",
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading indicator when loading is true", () => {
    store = mockStore({
      notifications: {
        loading: true,
        notifications: [],
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders notification list after loading is false", () => {
    const notificationsData = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];

    store = mockStore({
      notifications: {
        loading: false,
        notifications: notificationsData,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    notificationsData.forEach(({ value }) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it("displays 'No notifications' when notification list is empty and not loading", () => {
    store = mockStore({
      notifications: {
        loading: false,
        notifications: [],
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/no notifications/i)).toBeInTheDocument();
  });
});
