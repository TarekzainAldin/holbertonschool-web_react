import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer, {
  fetchNotifications,
} from "../../features/notifications/notificationsSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const mockNotifications = [
  { id: 1, type: "default", isRead: false, value: "New course available" },
  { id: 2, type: "urgent", isRead: false, value: "New resume available" },
  { id: 3, type: "urgent", isRead: true, value: "This is read" },
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

describe("Notifications", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(ENDPOINTS.notifications).reply(200, {
      notifications: mockNotifications,
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test("renders loading text initially", () => {
    const { store } = renderWithRedux(<Notifications />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("renders notifications after fetch and filters urgent", async () => {
    const { store } = renderWithRedux(<Notifications />);
    await store.dispatch(fetchNotifications());

    // اضغط زر urgent لفلترة
    fireEvent.click(screen.getByText(/‼️ Urgent/i));
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.queryByText("New course available")).not.toBeInTheDocument();
  });

  test("renders notifications after fetch and filters default", async () => {
    const { store } = renderWithRedux(<Notifications />);
    await store.dispatch(fetchNotifications());

    fireEvent.click(screen.getByText(/🔔 Default/i));
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.queryByText("New resume available")).not.toBeInTheDocument();
  });

  test("renders all notifications after fetch", async () => {
    const { store } = renderWithRedux(<Notifications />);
    await store.dispatch(fetchNotifications());

    fireEvent.click(screen.getByText(/All/i));
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
  });
});
