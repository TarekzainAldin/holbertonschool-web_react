import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer, { fetchNotifications } from "../../features/notifications/notificationsSlice";
import Notifications from "./Notifications";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const mockNotifications = [
  { id: 1, type: "default", isRead: false, value: "New course available" },
  { id: 2, type: "urgent", isRead: false, value: "New resume available" },
  { id: 3, type: "default", isRead: true, value: "Old notification" }, // Should be filtered out
];

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Notifications component", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(ENDPOINTS.notifications).reply(200, { notifications: mockNotifications });
  });

  afterEach(() => {
    mock.restore();
  });

  test("renders loading state initially", () => {
    const { store } = renderWithRedux(<Notifications />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders only unread notifications after fetch", async () => {
    const { store } = renderWithRedux(<Notifications />);
    await store.dispatch(fetchNotifications());

    // Default filter "all"
    expect(await screen.findByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.queryByText("Old notification")).not.toBeInTheDocument();
  });

  test("filter urgent notifications", async () => {
    const { store } = renderWithRedux(<Notifications />);
    await store.dispatch(fetchNotifications());

    fireEvent.click(screen.getByText("‼️ Urgent"));
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.queryByText("New course available")).not.toBeInTheDocument();
  });

  test("filter default notifications", async () => {
    const { store } = renderWithRedux(<Notifications />);
    await store.dispatch(fetchNotifications());

    fireEvent.click(screen.getByText("🔵 Default"));
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.queryByText("New resume available")).not.toBeInTheDocument();
  });

  test("mark notification as read removes it from list", async () => {
    const { store } = renderWithRedux(<Notifications />);
    await store.dispatch(fetchNotifications());

    fireEvent.click(screen.getByText("New course available"));

    await waitFor(() =>
      expect(screen.queryByText("New course available")).not.toBeInTheDocument()
    );
  });
});
