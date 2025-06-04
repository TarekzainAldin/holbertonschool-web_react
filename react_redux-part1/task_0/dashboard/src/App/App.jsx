import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notifications from "./Notifications";
import Login from "./Login";
import CourseList from "./CourseList";
import { appReducer, initialState, APP_ACTIONS } from "./App/appReducer";
import axios from "axios";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, displayDrawer, notifications, courses } = state;

  const logIn = (email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  };

  const logOut = () => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  };

  const markNotificationAsRead = (id) => {
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: { id } });
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/notifications.json");
        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: { notifications: response.data },
        });
      } catch (err) {
        console.error("Error loading notifications", err);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get("/courses.json");
          dispatch({
            type: APP_ACTIONS.SET_COURSES,
            payload: { courses: response.data },
          });
        } catch (err) {
          console.error("Error loading courses", err);
        }
      };

      fetchCourses();
    }
  }, [user]);

  return (
    <>
      <Header user={user} logOut={logOut} />
      <Notifications
        displayDrawer={displayDrawer}
        listNotifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        toggleDrawer={() => dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER })}
      />
      {user.isLoggedIn ? (
        <CourseList listCourses={courses} />
      ) : (
        <Login logIn={logIn} />
      )}
      <Footer user={user} />
    </>
  );
}

export default App;
