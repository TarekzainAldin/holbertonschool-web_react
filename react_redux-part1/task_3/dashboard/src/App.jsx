import React from 'react';
import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoginContainer from './features/auth/LoginContainer'; // redux-connected Login
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';

import { logout } from './features/auth/authSlice'; // redux action for logout

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
  notifications: `${API_BASE_URL}/notifications.json`,
};

export default function App() {
  const dispatch = useDispatch();

  // Select auth state from redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  // Local state for notifications and courses can stay as useReducer or useState
  // (You could move them to redux later if you want)

  // For brevity, I'm assuming you keep your existing reducer & state for notifications & courses
  // You would need to keep your reducer or move to redux for them separately.

  // ... your existing code for fetching notifications and courses
  // Adapted to hooks useEffect, etc.

  // For demo, simplified:
  const [notifications, setNotifications] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [displayDrawer, setDisplayDrawer] = React.useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(ENDPOINTS.notifications);
        // Handle latest notifications logic as before
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(ENDPOINTS.courses);
          setCourses(response.data.courses || []);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
      fetchCourses();
    } else {
      setCourses([]);
    }
  }, [isLoggedIn]);

  const handleDisplayDrawer = useCallback(() => setDisplayDrawer(true), []);
  const handleHideDrawer = useCallback(() => setDisplayDrawer(false), []);

  const handleLogOut = () => {
    dispatch(logout());
  };

  const markNotificationAsRead = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    console.log(`Notification ${id} has been marked as read`);
  }, []);

  return (
    <>
      <Notifications
        notifications={notifications}
        handleHideDrawer={handleHideDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        displayDrawer={displayDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <>
        <Header user={user} logOut={handleLogOut} />
        {!isLoggedIn ? (
          <BodySectionWithMarginBottom title="Log in to continue">
            <LoginContainer />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </>
      <Footer user={user} />
    </>
  );
}
