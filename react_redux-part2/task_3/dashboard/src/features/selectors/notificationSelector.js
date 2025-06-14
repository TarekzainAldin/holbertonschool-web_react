import { createSelector } from "@reduxjs/toolkit";

export const getNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
  [getNotifications, (state, filter) => filter],
  (notifications, filter) => {
    if (filter === "all") {
      return notifications;
    }
    return notifications.filter((notif) => notif.type === filter);
  }
);
