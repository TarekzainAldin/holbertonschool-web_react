import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const initialState = {
  notifications: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(ENDPOINTS.notifications);
      // Filter unread notifications only, map to required fields
      const unreadNotifications = response.data.notifications
        .filter((notif) => notif.isRead === false)
        .map(({ id, type, isRead, value }) => ({ id, type, isRead, value }));
      return unreadNotifications;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching notifications");
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const idToMark = action.payload;
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== idToMark
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
