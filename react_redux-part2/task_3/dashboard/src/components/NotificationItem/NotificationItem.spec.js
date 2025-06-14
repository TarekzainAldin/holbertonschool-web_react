import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer, {
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";

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

describe("NotificationItem", () => {
  test("renders notification text and applies color based on type", () => {
    renderWithRedux(
      <NotificationItem id={1} type="urgent" value="Urgent notification" />
    );
    const item = screen.getByText("Urgent notification");
    expect(item).toBeInTheDocument();
    expect(item).toHaveStyle("color: red");
  });

  test("dispatches markNotificationAsRead on click", () => {
    const { store } = renderWithRedux(
      <NotificationItem id={2} type="default" value="Default notification" />
    );

    const item = screen.getByText("Default notification");
    fireEvent.click(item);

    const state = store.getState().notifications;
    expect(state.notifications.find((n) => n.id === 2)).toBeUndefined();
  });
});
