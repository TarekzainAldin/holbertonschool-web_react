import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

// الحالة الابتدائية
const initialState = {
  notifications: [],
  displayDrawer: true
};

// عنوان السيرفر
const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`
};

// thunk غير متزامن لجلب الإشعارات
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    try {
      const response = await axios.get(ENDPOINTS.notifications);
      const currentNotifications = response.data.notifications;

      const latestNotif = {
        id: 3,
        type: 'urgent',
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
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
);

// إنشاء السلايس
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const idToRemove = action.payload;
      console.log(`Notification ${idToRemove} has been marked as read`);
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== idToRemove
      );
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  }
});

// التصدير
export const {
  markNotificationAsRead,
  showDrawer,
  hideDrawer
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
