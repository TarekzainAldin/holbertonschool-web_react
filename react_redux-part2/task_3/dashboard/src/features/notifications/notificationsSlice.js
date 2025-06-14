import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notifications: [],
  loading: false,
};

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

// thunk لجلب الإشعارات، مع ترشيح فقط غير المقروءة
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(ENDPOINTS.notifications);
      // ترشيح الإشعارات غير المقروءة فقط، مع الحقول id, type, isRead, value
      const unreadNotifications = response.data.notifications
        .filter((notif) => notif.isRead === false)
        .map(({ id, type, isRead, value }) => ({ id, type, isRead, value }));

      return unreadNotifications;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
