import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLatestNotification } from "../../utils/utils";

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    const currentNotifications = response.data.notifications;

    const latestNotif = {
      id: 3,
      type: "urgent",
      html: { __html: getLatestNotification() },
    };

    const indexToReplace = currentNotifications.findIndex(
      (notification) => notification.id === 3
    );

    const updatedNotifications = [...currentNotifications];

    if (indexToReplace !== -1) {
      updatedNotifications[indexToReplace] = latestNotif;
    } else {
      updatedNotifications.push(latestNotif);
    }

    return updatedNotifications;
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const idToRemove = action.payload;
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== idToRemove
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
