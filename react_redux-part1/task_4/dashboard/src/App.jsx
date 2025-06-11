import  { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';

import { login, logout } from './features/auth/authSlice';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
  notifications: `${API_BASE_URL}/notifications.json`,
};

export default function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [displayDrawer, setDisplayDrawer] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(ENDPOINTS.notifications);
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

  const handleLogin = (email, password) => {
    dispatch(login({ email, password }));
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const markNotificationAsRead = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
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
            <Login login={handleLogin} />
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
      <Footer />
    </>
  );
}
